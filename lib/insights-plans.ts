/**
 * The plans, fetched from Insights.
 *
 * ── The contract ─────────────────────────────────────────────────────────────
 *
 * `GET ${NEXT_PUBLIC_INSIGHTS_URL}/api/public/plans`. The shape is declared on
 * the Insights side in `lib/billing/public-plans.ts`, and served by
 * `server/routes/api/public/plans.get.ts` there. **The two sides must agree —
 * change one and change the other in the same breath.** `PublicPlansResponse`
 * below is this repo's copy of that shape; `validatePlansResponse` is what
 * stops a disagreement becoming a broken pricing page.
 *
 * ```jsonc
 * {
 *   "version": 1,
 *   "source": "stripe" | "catalog" | "mixed",  // where the PRICES came from
 *   "currency": "usd",
 *   "interval": "month",
 *   "maxSeats": 6,                             // self-serve ceiling
 *   "orgTypes": {
 *     "carrier": [
 *       {
 *         "key": "pricing_analytics",
 *         "name": "Pricing + Analytics",       // no "BulkInsights - " prefix
 *         "description": "…",
 *         "maxSeats": 6,                       // this package's own ceiling
 *         "buildsOn": "pricing_only" | null,
 *         "leadIn": "Everything in Pricing, plus" | null,
 *         "eligibilityGated": false,           // true only for Owner Operator
 *         "tiers": [{ "upTo": 3 | "inf", "unitAmount": 10900 }],
 *         "features": ["Rate estimates", "…"], // full list, not the increment
 *         "source": "stripe" | "catalog"
 *       }
 *     ],
 *     "broker": [ … ], "shipper": [ … ]
 *   }
 * }
 * ```
 *
 * Prices are in cents, per seat, per month, and volume-tiered: crossing a band
 * reprices every seat.
 *
 * ── Why fetch at all ─────────────────────────────────────────────────────────
 *
 * `lib/plans.ts` is a hand-kept mirror of the Insights catalog and a mirror can
 * drift. Nothing here can produce a wrong charge — checkout resolves the live
 * Stripe price server-side and Stripe shows the amount again before anyone pays
 * — but it can produce a wrong advert, and this is what closes that.
 *
 * ── When it runs ─────────────────────────────────────────────────────────────
 *
 * At `next build`, and then again every `revalidate` seconds thereafter: the
 * three ICP pages set `export const revalidate` and this fetch passes the same
 * window, so ISR re-renders them in the background against fresh prices. Before
 * that, a price change in Insights reached this site only on the next deploy —
 * an unbounded drift window on the one thing this file exists to keep honest.
 *
 * ── Why it can never break the build ─────────────────────────────────────────
 *
 * A marketing site that will not deploy because another app was briefly
 * unreachable is a worse failure than a slightly stale price. At **build** time
 * every failure — unreachable host, non-200, malformed body, a shape this
 * version does not understand — degrades to `lib/plans.ts` and prints a loud
 * warning. It never throws and never returns an empty plan list.
 *
 * At **revalidation** it does the opposite, and deliberately: see
 * {@link isBuildPhase}.
 */

import { INSIGHTS_ORIGIN, ORG_TYPES, type OrgType } from "@/lib/brand";
import {
  type Plan,
  type PlanKey,
  type PlanTier,
  MAX_SELF_SERVE_SEATS,
  OWNER_OPERATOR_ELIGIBILITY,
  PLAN_KEYS,
  STATIC_PLANS,
  sortTiers,
} from "@/lib/plans";

/** Contract version this build understands. A different one is a hard refusal. */
const SUPPORTED_VERSION = 1;

/** The build must not sit on an unreachable host. */
const FETCH_TIMEOUT_MS = 10_000;

/**
 * How long a rendered pricing page may be before it is regenerated.
 *
 * An hour, matching the `s-maxage` Insights sets on the endpoint, so this does
 * not poll faster than the answer can change. Re-exported by the ICP pages as
 * their `revalidate`; the fetch below passes the same number, so page and data
 * expire together instead of a fresh render reusing an hours-old fetch.
 */
export const PLANS_REVALIDATE_SECONDS = 3600;

/**
 * Compile-time proof that a page's `revalidate` is this same number.
 *
 * Next reads `export const revalidate` by static analysis and rejects anything
 * that is not a literal — `revalidate = PLANS_REVALIDATE_SECONDS` fails the
 * build with "Unknown identifier". So each ICP page writes the literal out, and
 * writes this alias underneath it: if the two ever disagree, the type error
 * says so at `tsc` rather than leaving pages that regenerate on a different
 * clock from the data they regenerate for.
 */
export type AssertRevalidateMatches<T extends typeof PLANS_REVALIDATE_SECONDS> = T;

/** Where the numbers on the page came from. */
export type PlansSource = "insights" | "static";

export type LoadedPlans = {
  plans: ReadonlyArray<Plan>;
  /** The self-serve seat ceiling, above which it is contact-sales. */
  maxSeats: number;
  /**
   * `insights` when the endpoint answered and validated. `static` when anything
   * at all went wrong and `lib/plans.ts` is what is on the page.
   *
   * Note this is NOT the endpoint's own `source` field, which says whether
   * Insights read its prices from Stripe or from its own catalog. Both of those
   * are `insights` here: either way the figures came from the app that owns
   * them, rather than from this repo's copy.
   */
  source: PlansSource;
};

// ── the wire shape ────────────────────────────────────────────────

type WireTier = { upTo: number | "inf"; unitAmount: number };

type WirePlan = {
  key: PlanKey;
  name: string;
  description: string;
  maxSeats: number;
  buildsOn: PlanKey | null;
  leadIn: string | null;
  eligibilityGated: boolean;
  tiers: ReadonlyArray<WireTier>;
  features: ReadonlyArray<string>;
};

export type PublicPlansResponse = {
  version: number;
  maxSeats: number;
  orgTypes: Record<OrgType, ReadonlyArray<WirePlan>>;
};

// ── the validator ─────────────────────────────────────────────────
//
// Hand-rolled on purpose: this repo has no schema library and one endpoint does
// not earn a dependency.
//
// The rule it follows is about blast radius. Rejecting the whole payload throws
// away every correct price in it to punish one bad field, so a total refusal is
// reserved for a body that cannot be read at all, or one whose refusal is
// itself the safe answer. Everything narrower degrades narrowly: an unknown or
// malformed plan is dropped and named in the log, and only an org type left
// with nothing to show falls all the way back to the mirror.
//
// Fields nothing renders are not validated at all. `source` (top level and per
// plan) is Insights reporting on its own internals; it is genuinely useful in a
// log and has no business deciding whether this site has prices.

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** A whole number of things: seats, ceilings. Never zero, never fractional. */
function isCount(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v) && v > 0;
}

/**
 * A price in cents.
 *
 * Zero is allowed, unlike a count. A zero band is a real thing a catalog can
 * express — a bundled seat, a promotional tier — and rejecting it took down the
 * entire pricing page for a price that was merely unusual. (This site must not
 * *describe* anything as free; that is a copy rule, and it is not this
 * function's business to enforce it by refusing to read the number.)
 */
function isAmount(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= 0;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isPlanKey(v: unknown): v is PlanKey {
  return typeof v === "string" && (PLAN_KEYS as ReadonlyArray<string>).includes(v);
}

function validateTier(raw: unknown): WireTier | null {
  if (!isObject(raw)) return null;
  if (!isAmount(raw.unitAmount)) return null;
  if (raw.upTo === "inf") return { upTo: "inf", unitAmount: raw.unitAmount };
  if (!isCount(raw.upTo)) return null;
  return { upTo: raw.upTo, unitAmount: raw.unitAmount };
}

/**
 * One plan, or a reason it is unusable.
 *
 * Both failure kinds are handled the same way by the caller — drop the card,
 * name it in the log — but they are distinguished because they say different
 * things to whoever reads that log. `unknown-key` means Insights sells
 * something this site has not been taught about yet, which is a job for a
 * person. Everything else means the payload is wrong, which is a bug.
 */
function validatePlan(raw: unknown): WirePlan | "unknown-key" | "malformed" {
  if (!isObject(raw)) return "malformed";
  if (!isPlanKey(raw.key)) return "unknown-key";
  if (!isNonEmptyString(raw.name) || !isNonEmptyString(raw.description)) return "malformed";
  if (!isCount(raw.maxSeats)) return "malformed";
  if (raw.buildsOn !== null && !isPlanKey(raw.buildsOn)) return "malformed";
  if (raw.leadIn !== null && !isNonEmptyString(raw.leadIn)) return "malformed";
  if (typeof raw.eligibilityGated !== "boolean") return "malformed";

  if (!Array.isArray(raw.tiers) || raw.tiers.length === 0) return "malformed";
  const tiers: Array<WireTier> = [];
  for (const t of raw.tiers) {
    const tier = validateTier(t);
    if (!tier) return "malformed";
    tiers.push(tier);
  }
  // Normalised here, once, at the only place untrusted tiers enter: `entryRate`
  // and `volumeBreak` read bands positionally and call the first one the
  // headline, so an unsorted list would advertise the six-seat rate as the
  // starting price. `sortTiers` also rejects a list that cannot be ordered —
  // duplicate ceilings, two open-ended bands — because picking a winner there
  // would be inventing a price.
  const ordered = sortTiers(tiers);
  if (!ordered) return "malformed";

  // An empty bullet list renders a card with a price and nothing under it.
  if (!Array.isArray(raw.features) || raw.features.length === 0) return "malformed";
  if (!raw.features.every(isNonEmptyString)) return "malformed";

  return {
    key: raw.key,
    name: raw.name,
    description: raw.description,
    maxSeats: raw.maxSeats,
    buildsOn: raw.buildsOn,
    leadIn: raw.leadIn,
    eligibilityGated: raw.eligibilityGated,
    tiers: ordered,
    features: raw.features,
  };
}

export type ValidationResult =
  | {
      ok: true;
      value: PublicPlansResponse;
      /** Plans left off the page, as `"<orgType>:<key> (<why>)"`. */
      dropped: ReadonlyArray<string>;
    }
  | { ok: false; reason: string };

export function validatePlansResponse(raw: unknown): ValidationResult {
  if (!isObject(raw)) return { ok: false, reason: "body is not an object" };
  // The one field whose disagreement is worth refusing the whole payload for:
  // a different version means the shape itself is not the one read below, so
  // there is nothing here that can be trusted field by field.
  if (raw.version !== SUPPORTED_VERSION) {
    return {
      ok: false,
      reason: `contract version ${String(raw.version)}, this build understands ${SUPPORTED_VERSION}`,
    };
  }
  if (!isCount(raw.maxSeats)) return { ok: false, reason: "maxSeats is not a seat count" };
  if (!isObject(raw.orgTypes)) return { ok: false, reason: "orgTypes is not an object" };

  // Currency and interval are checked only when they are present AND explicitly
  // contradict what this site renders, which hardcodes a "$" and the words "per
  // user each month". That narrowness is the point: an absent field is ignored,
  // and so is any value that merely surprises us. But an amount denominated in
  // something other than USD, rendered under a dollar sign, is not a stale
  // advert — it is a wrong one, and the stale mirror is the better answer.
  if (raw.currency !== undefined && raw.currency !== "usd") {
    return { ok: false, reason: `prices are in ${String(raw.currency)}, this site renders USD` };
  }
  if (raw.interval !== undefined && raw.interval !== "month") {
    return {
      ok: false,
      reason: `prices bill per ${String(raw.interval)}, this site says "each month"`,
    };
  }

  const orgTypes = {} as Record<OrgType, Array<WirePlan>>;
  const dropped: Array<string> = [];
  for (const orgType of ORG_TYPES) {
    const list = raw.orgTypes[orgType];
    if (!Array.isArray(list)) return { ok: false, reason: `orgTypes.${orgType} is not an array` };
    const plans: Array<WirePlan> = [];
    for (const entry of list) {
      const plan = validatePlan(entry);
      if (plan === "unknown-key" || plan === "malformed") {
        const key = isObject(entry) ? String(entry.key) : "?";
        dropped.push(`${orgType}:${key} (${plan})`);
        continue;
      }
      plans.push(plan);
    }
    // An org type with nothing left renders a pricing section with no cards,
    // which is worse than a stale price. That, and only that, is what takes the
    // whole payload down to the mirror.
    if (plans.length === 0) return { ok: false, reason: `no usable plans for ${orgType}` };
    orgTypes[orgType] = plans;
  }

  return { ok: true, value: { version: raw.version, maxSeats: raw.maxSeats, orgTypes }, dropped };
}

// ── wire shape to the shape the cards render ──────────────────────

/** The copy fields a plan carries once, however many org types buy it. */
const SHARED_COPY = ["name", "description", "leadIn", "maxSeats"] as const;

/**
 * Fold the per-org-type lists into this repo's per-plan shape.
 *
 * Insights groups by org type because that is how it sells; `PricingSection`
 * wants one plan carrying a price per org type, because that is how it renders.
 *
 * The fold keeps the copy from the first org type that mentions a plan and
 * discards the rest, which is correct only because Insights derives that copy
 * from the package and not from the price — one package, one name. That is an
 * assumption about the *other* repo, so it is checked rather than trusted:
 * divergence is reported, loudly, instead of silently resolving to whichever
 * persona happened to be read first.
 */
export function toPlans(
  res: PublicPlansResponse,
  onWarn: (message: string) => void = () => {},
): Array<Plan> {
  const byKey = new Map<PlanKey, Plan>();
  for (const orgType of ORG_TYPES) {
    for (const wire of res.orgTypes[orgType]) {
      const tiers: ReadonlyArray<PlanTier> = wire.tiers.map((t) => ({
        upTo: t.upTo,
        unitAmount: t.unitAmount,
      }));
      const existing = byKey.get(wire.key);
      if (existing) {
        const differing = SHARED_COPY.filter((field) => {
          const kept = field === "leadIn" ? (existing.leadIn ?? null) : existing[field];
          return kept !== wire[field];
        });
        if (differing.length > 0) {
          onWarn(
            `Insights describes ${wire.key} differently to ${orgType} than to the persona read before it ` +
              `(${differing.join(", ")}). The first wins; the page may not say what the app says.`,
          );
        }
        existing.prices[orgType] = tiers;
        continue;
      }
      byKey.set(wire.key, {
        key: wire.key,
        name: wire.name,
        description: wire.description,
        maxSeats: wire.maxSeats,
        // The condition is Insights' to enforce and this site's to word: the
        // endpoint reports that the plan is gated, not the sentence a carrier
        // reads about it.
        ...(wire.eligibilityGated ? { eligibility: OWNER_OPERATOR_ELIGIBILITY } : {}),
        ...(wire.buildsOn ? { buildsOn: wire.buildsOn } : {}),
        ...(wire.leadIn ? { leadIn: wire.leadIn } : {}),
        prices: { [orgType]: tiers },
        features: wire.features,
      });
    }
  }

  const folded = [...byKey.values()];
  // `plansFor` filters this one list per page, so each persona sees the folded
  // order rather than the order Insights sent for them. Those agree as long as
  // every org type's list is a subsequence of the fold — true when the lists are
  // all in one catalog order, which is what Insights builds. Checked rather than
  // assumed: a violation reorders somebody's pricing cards, and reordering them
  // by price is the kind of wrong that looks fine.
  for (const orgType of ORG_TYPES) {
    const wireOrder = res.orgTypes[orgType].map((p) => p.key);
    const foldedOrder = folded.filter((p) => p.prices[orgType]).map((p) => p.key);
    if (wireOrder.join(",") !== foldedOrder.join(",")) {
      onWarn(
        `Insights lists ${orgType} plans as [${wireOrder.join(", ")}] but this page will render ` +
          `[${foldedOrder.join(", ")}]. The cards are in a different order to the app's picker.`,
      );
    }
  }
  return folded;
}

// ── the fetch ─────────────────────────────────────────────────────

const PLANS_PATH = "/api/public/plans";

/** What ships when anything at all goes wrong: this repo's own mirror. */
const STATIC_RESULT: LoadedPlans = {
  plans: STATIC_PLANS,
  maxSeats: MAX_SELF_SERVE_SEATS,
  source: "static",
};

/**
 * Whether this render is `next build` rather than an ISR regeneration.
 *
 * The distinction decides what a failure means, and the two answers are
 * opposite:
 *
 * - **At build** there is no previously rendered page to keep, so falling back
 *   to the mirror is the only way to produce a pricing section at all. It also
 *   must not fail: a marketing site that will not deploy because another app
 *   had a bad minute is a worse outcome than a stale price.
 *
 * - **At revalidation** there IS a good page already on disk, rendered from
 *   real prices. Next's contract is that a regeneration which *throws* is
 *   discarded — the last successful render keeps being served and the attempt
 *   is retried on a later request. So the honest move is to throw and keep the
 *   good page, rather than "succeed" with mirror prices and overwrite fresher,
 *   truer numbers with older ones. Swallowing the error would make an Insights
 *   blip permanently downgrade a page that was already correct.
 *
 * `NEXT_PHASE` is set to `phase-production-build` by `next build` and is absent
 * in the server runtime. Every ICP page is prerendered at build, so the throw
 * path always has a last good render behind it.
 */
function isBuildPhase(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}

/**
 * Loud, because the quiet version of this is a pricing page that silently stops
 * tracking the product. Multi-line and prefixed so it survives a scroll through
 * a Vercel build log.
 */
function banner(headline: string, lines: ReadonlyArray<string>): void {
  console.warn(
    [
      "",
      "  ┌─────────────────────────────────────────────────────────────────────",
      `  │ PLANS: ${headline}`,
      ...lines.map((l) => `  │ ${l}`),
      `  │ Endpoint: ${INSIGHTS_ORIGIN}${PLANS_PATH}`,
      "  └─────────────────────────────────────────────────────────────────────",
      "",
    ].join("\n"),
  );
}

/**
 * Fell back to the mirror. The prices on this build are this repo's copy.
 *
 * Warns per occurrence rather than once per process: the three ICP pages each
 * resolve their own prices, so three of these means three pages shipped stale,
 * and collapsing that to one line understated it.
 */
function warnFallback(reason: string): LoadedPlans {
  banner("could not use the live catalog from Insights.", [
    reason,
    "Falling back to the static mirror in lib/plans.ts, which may be out of",
    "date. Prices on this build are an advert, not a quote — checkout resolves",
    "the real price from Stripe either way.",
  ]);
  return STATIC_RESULT;
}

/**
 * A failure during ISR regeneration. Throwing keeps the last good page.
 *
 * Deliberately not the fallback banner: nothing was replaced by mirror prices,
 * and saying so would send someone looking for a stale deploy that did not
 * happen.
 */
function throwForRevalidation(reason: string): never {
  banner("could not refresh prices from Insights.", [
    reason,
    "Keeping the last successfully rendered pricing page rather than replacing",
    "live prices with the static mirror. Next will retry on a later request.",
  ]);
  throw new Error(`plans revalidation failed: ${reason}`);
}

/** Fall back at build, keep the good render at revalidation. */
function degrade(reason: string): LoadedPlans {
  return isBuildPhase() ? warnFallback(reason) : throwForRevalidation(reason);
}

/**
 * Read the plans from Insights.
 *
 * Not memoised in this module. Next's data cache already dedupes this fetch
 * across the three pages of a build and is what makes `revalidate` mean
 * anything — a module-level memo would sit in front of it and serve a warm
 * lambda the same prices forever, quietly defeating the ISR this file just
 * gained. It would also cache a *failure* as though it had succeeded, which is
 * how one bad minute at build time used to pin the mirror for the whole
 * process.
 */
export async function loadPlans(): Promise<LoadedPlans> {
  let body: unknown;
  try {
    const res = await fetch(`${INSIGHTS_ORIGIN}${PLANS_PATH}`, {
      // The page's `revalidate` and the data's expiry are the same number, so a
      // regenerated page never reuses an older fetch than itself.
      next: { revalidate: PLANS_REVALIDATE_SECONDS },
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return degrade(`the endpoint answered ${res.status} ${res.statusText}.`);
    body = await res.json();
  } catch (err) {
    // A throw from `throwForRevalidation` must not be caught and turned back
    // into a fallback by this very handler.
    if (err instanceof Error && err.message.startsWith("plans revalidation failed")) throw err;
    return degrade(`the request failed: ${err instanceof Error ? err.message : String(err)}.`);
  }

  const validated = validatePlansResponse(body);
  if (!validated.ok) return degrade(`the response did not validate: ${validated.reason}.`);

  const warnings: Array<string> = [];
  const plans = toPlans(validated.value, (message) => warnings.push(message));

  // Not a fallback, and it does not say "falling back": the plans this build
  // does know about are live and correct, and only the dropped cards are
  // missing. Saying otherwise sent people looking for a stale deploy.
  if (validated.dropped.length > 0) {
    banner("some plans were left off the page.", [
      `Dropped: ${validated.dropped.join(", ")}`,
      "An (unknown-key) plan is one Insights sells that this site has not been",
      "taught to render — add it to lib/plans.ts. A (malformed) one is a bug in",
      "the payload. Every other plan on this build came from Insights and is live.",
    ]);
  }
  if (warnings.length > 0) banner("the fold disagreed with Insights.", warnings);

  return { plans, maxSeats: validated.value.maxSeats, source: "insights" };
}
