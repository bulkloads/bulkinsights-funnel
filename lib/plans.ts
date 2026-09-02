/**
 * The self-serve plans, as the funnel advertises them.
 *
 * `STATIC_PLANS` below is a hand-kept mirror of
 * `lib/billing/self-serve-catalog.ts` in the Insights repo, which is where
 * these prices are actually defined and from which Stripe is provisioned.
 *
 * **It is no longer what the pages render.** `lib/insights-plans.ts` fetches
 * the live catalog from Insights at build time and the cards render from that;
 * this copy is the fallback for a build where Insights could not be reached or
 * answered with something the validator would not accept. Keeping it accurate
 * still matters — it is what ships when the fetch fails — but a drift is now
 * caught by a loud warning in the build log rather than by somebody noticing.
 *
 * Nothing here can produce a wrong charge either way. These figures are a shop
 * window: the plan picker on `/upgrade` re-renders from the real catalog,
 * checkout resolves the live Stripe price server-side, and Stripe shows the
 * amount again before anyone pays. A stale number here is a wrong advert.
 *
 * Sourced 2026-09-01 from the Insights `feat/insights-front-door` branch.
 *
 * Prices are **per seat per month**, in cents, and volume-tiered: crossing a
 * band reprices every seat, not just the ones above the line. Every figure in
 * this file, every `PlanTier` in it, and every price the cards render is
 * monthly, which is why `PricingSection` can write "per user each month" as a
 * constant beside the number.
 *
 * Insights also sells the same packages yearly and its endpoint reports those
 * bands (`yearlyTiers`, see `lib/insights-plans.ts`). This site does not show
 * them and this mirror does not carry them: a yearly toggle is future work, and
 * it is a real piece of work rather than a multiplication, because a yearly
 * band is its own price and is free to stop being twelve monthly ones. When it
 * lands, `PlanTier` grows a second set of bands here and the cards grow a
 * control to switch between them.
 */

import type { OrgType } from "@/lib/brand";

export type PlanKey =
  | "owner_operator"
  | "pricing_only"
  | "pricing_analytics"
  | "pricing_analytics_procurement";

/** One volume band. `upTo` is an inclusive seat ceiling. */
export type PlanTier = { upTo: number | "inf"; unitAmount: number };

export type Plan = {
  key: PlanKey;
  /** As the plan picker shows it, with the "BulkInsights - " prefix dropped. */
  name: string;
  description: string;
  maxSeats: number;
  /**
   * Owner Operator is not chosen, it is established: Insights checks the
   * federal census (and the fleet class bulkloads-v2 publishes) for a
   * one-truck, one-driver operation and refuses checkout otherwise. Shown here
   * with that condition stated rather than hidden, because a carrier page that
   * omits the cheapest plan in the catalog is its own kind of dishonest.
   */
  eligibility?: string;
  /** One price per org type this plan is sold to. */
  prices: Partial<Record<OrgType, ReadonlyArray<PlanTier>>>;
  /** The plan this one is a superset of. The catalog is strictly nested. */
  buildsOn?: PlanKey;
  /**
   * The "Everything in X, plus" line, worded by Insights and carried verbatim.
   *
   * Not assembled from the parent's `name`: doing that produced "Everything in
   * Pricing + Analytics, plus" here while the plan picker said "Everything in
   * Pricing and Analytics, plus", and a lead-in is copy rather than a label.
   */
  leadIn?: string;
  /** Feature labels this plan grants, in catalog order. */
  features: ReadonlyArray<string>;
};

/** Checkout caps here; above it is contact-sales. */
export const MAX_SELF_SERVE_SEATS = 6;

/** The seat count a plan card asks for. See `PricingSection`. */
export const DEFAULT_SEATS = 1;

/**
 * How this site words the Owner Operator condition.
 *
 * Insights reports only *that* the plan is gated; the sentence a carrier reads
 * about it is marketing copy and belongs here.
 */
export const OWNER_OPERATOR_ELIGIBILITY =
  "For single-truck operations. Eligibility is confirmed against your DOT record before checkout.";

const PRICING_FEATURES = [
  "Rate estimates",
  "Fuel prices",
  "Operating cost",
  "Year over year rates",
] as const;

const ANALYTICS_FEATURES = [
  "Commodity heatmap",
  "Commodity momentum",
  "Commodity trends",
  "Load heatmap",
  "Load volume",
  "Mileage band rates",
  "Regional activity",
  "Year over year overlay",
] as const;

const PROCUREMENT_FEATURES = [
  "Carrier discovery",
  "Request for proposal bidding",
  "Equipment heatmap",
  "Carrier heatmap",
] as const;

export const STATIC_PLANS: ReadonlyArray<Plan> = [
  {
    key: "owner_operator",
    name: "Owner Operator (Rating Only)",
    description:
      "Rate estimates, fuel prices, and operating cost for a single-truck operation.",
    maxSeats: 1,
    eligibility: OWNER_OPERATOR_ELIGIBILITY,
    prices: { carrier: [{ upTo: "inf", unitAmount: 5_000 }] },
    features: PRICING_FEATURES,
  },
  {
    key: "pricing_only",
    name: "Pricing",
    description:
      "Rate estimates, fuel prices, operating cost, and year-over-year rate history.",
    maxSeats: MAX_SELF_SERVE_SEATS,
    prices: {
      carrier: [
        { upTo: 3, unitAmount: 9_900 },
        { upTo: "inf", unitAmount: 8_900 },
      ],
    },
    features: PRICING_FEATURES,
  },
  {
    key: "pricing_analytics",
    name: "Pricing + Analytics",
    description:
      "Everything in Pricing, plus market analytics, commodity and load heatmaps, and volume trends.",
    maxSeats: MAX_SELF_SERVE_SEATS,
    buildsOn: "pricing_only",
    leadIn: "Everything in Pricing, plus",
    prices: {
      carrier: [
        { upTo: 3, unitAmount: 10_900 },
        { upTo: "inf", unitAmount: 9_900 },
      ],
      broker: [
        { upTo: 3, unitAmount: 15_000 },
        { upTo: "inf", unitAmount: 14_000 },
      ],
      shipper: [
        { upTo: 3, unitAmount: 19_900 },
        { upTo: "inf", unitAmount: 17_900 },
      ],
    },
    features: [...PRICING_FEATURES, ...ANALYTICS_FEATURES],
  },
  {
    key: "pricing_analytics_procurement",
    name: "Pricing + Analytics + Capacity Procurement",
    description:
      "Everything in Pricing and Analytics, plus equipment and carrier heatmaps, carrier discovery, and RFP bidding.",
    maxSeats: MAX_SELF_SERVE_SEATS,
    buildsOn: "pricing_analytics",
    leadIn: "Everything in Pricing and Analytics, plus",
    prices: {
      broker: [
        { upTo: 3, unitAmount: 29_900 },
        { upTo: "inf", unitAmount: 27_900 },
      ],
      shipper: [
        { upTo: 3, unitAmount: 39_900 },
        { upTo: "inf", unitAmount: 34_900 },
      ],
    },
    features: [...PRICING_FEATURES, ...ANALYTICS_FEATURES, ...PROCUREMENT_FEATURES],
  },
];

/**
 * Every package this build knows how to render, derived from the mirror.
 *
 * The fetch validator needs a runtime list: a key it does not recognise is a
 * package Insights has started selling that this site has never heard of, and
 * rendering a card for it would mean inventing copy nobody wrote. Derived
 * rather than declared beside `PlanKey`, because a hand-kept second list is one
 * more thing to forget — and forgetting it here means silently dropping a plan
 * from the pricing page.
 */
export const PLAN_KEYS: ReadonlyArray<PlanKey> = STATIC_PLANS.map((p) => p.key);

/**
 * The plans sold to one org type, cheapest first.
 *
 * `plans` is required. It used to default to the static mirror, which read as a
 * convenience and behaved as a trap: a caller that forgot the argument silently
 * rendered last-deploy prices with nothing in the build log, which is the exact
 * failure this whole fetch exists to remove. The one caller passes what
 * `loadPlans()` returned; if that fell back, it said so loudly first.
 */
export function plansFor(orgType: OrgType, plans: ReadonlyArray<Plan>): Array<Plan> {
  return plans.filter((plan) => plan.prices[orgType] !== undefined);
}

/** What one org type pays for a plan, or null when it is not sold to them. */
export function tiersFor(plan: Plan, orgType: OrgType): ReadonlyArray<PlanTier> | null {
  return plan.prices[orgType] ?? null;
}

/**
 * The opening band's rate: the headline a card shows.
 *
 * Assumes `tiers[0]` is the *lowest* band. Nothing about the wire format
 * guarantees that, so `assertTierOrder` is applied to everything that reaches
 * here — the validator normalises what Insights sends, and the module-init
 * check below covers the mirror. Reading an unsorted list would put the
 * six-seat rate on the card as the headline price.
 */
export function entryRate(tiers: ReadonlyArray<PlanTier>): number | null {
  return tiers[0]?.unitAmount ?? null;
}

/**
 * Where the per-seat rate first drops, and by how much. Null when there is
 * nothing to advertise: a flat price, or a second band that is not cheaper.
 *
 * Reads the first two bands in order, so it carries the same ordering
 * precondition as {@link entryRate}.
 */
export function volumeBreak(tiers: ReadonlyArray<PlanTier>): {
  fromSeats: number;
  savingPerSeatCents: number;
} | null {
  const [opening, next] = tiers;
  if (!opening || !next || opening.upTo === "inf") return null;
  if (next.unitAmount >= opening.unitAmount) return null;
  return {
    fromSeats: opening.upTo + 1,
    savingPerSeatCents: opening.unitAmount - next.unitAmount,
  };
}

/**
 * The bullets for one plan: what it adds over the next cheapest, since the
 * plans are strictly nested.
 *
 * `shown` decides whether the shorthand is honest. Pricing is sold to carriers
 * alone, so on the broker and shipper pages "Everything in Pricing, plus" would
 * point at a plan that is not on the page, leaving rate estimates and fuel
 * prices named nowhere. When the plan a card builds on is absent, the card
 * lists its own features in full instead.
 *
 * So does a plan carrying no `leadIn`. The lead-in is Insights' wording, not a
 * sentence to assemble from the parent's name, and the full list is never wrong
 * — only longer.
 */
export function highlightsFor(
  plan: Plan,
  shown: ReadonlyArray<PlanKey>,
  plans: ReadonlyArray<Plan>,
): { leadIn: string | null; features: ReadonlyArray<string> } {
  const parentKey = plan.buildsOn;
  const parent = parentKey ? plans.find((p) => p.key === parentKey) : undefined;
  if (!parent || !parentKey || !plan.leadIn || !shown.includes(parentKey)) {
    return { leadIn: null, features: plan.features };
  }
  const inherited = new Set(parent.features);
  return {
    leadIn: plan.leadIn,
    features: plan.features.filter((f) => !inherited.has(f)),
  };
}

/** Cents as dollars. Every price in the catalog is round; keep it that way. */
export function formatUsdCents(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars)
    ? `$${dollars.toLocaleString("en-US")}`
    : `$${dollars.toFixed(2)}`;
}

// ── the tier-ordering invariant ───────────────────────────────────
//
// `entryRate` and `volumeBreak` both read `tiers[0]` and `tiers[1]` positionally
// and call the first one the headline. That is only true of a list sorted by
// ceiling with the open-ended band last, and until now nothing checked it on
// either side: not the wire, and not the literal below. A reversed list would
// have quietly advertised the six-seat rate as the starting price, and a
// `volumeBreak` computed backwards would have promised a saving that does not
// exist. Both are wrong adverts, and both look entirely plausible on the page.

/** A ceiling as a sortable number. The open-ended band is last by construction. */
function ceiling(tier: PlanTier): number {
  return tier.upTo === "inf" ? Number.POSITIVE_INFINITY : tier.upTo;
}

/**
 * The same bands, ordered so the positional readers above are correct.
 *
 * Returns null for a list that cannot be ordered meaningfully — an empty one,
 * a duplicated ceiling, or more than one open-ended band. Those are malformed
 * rather than merely unsorted, and a caller that quietly "fixed" one by picking
 * an arbitrary winner would be inventing a price.
 */
export function sortTiers(
  tiers: ReadonlyArray<PlanTier>,
): ReadonlyArray<PlanTier> | null {
  if (tiers.length === 0) return null;
  const sorted = [...tiers].sort((a, b) => ceiling(a) - ceiling(b));
  for (let i = 1; i < sorted.length; i++) {
    // Strictly increasing: equal ceilings (including two "inf" bands) leave no
    // way to say which one a seat count bills at.
    if (ceiling(sorted[i]!) <= ceiling(sorted[i - 1]!)) return null;
  }
  return sorted;
}

/**
 * Hold the static mirror to the same rule, at module load.
 *
 * A throw here fails the build, which is the point: unlike an unreachable
 * Insights — a condition of the world, which must always degrade — a malformed
 * literal in this file is a mistake someone just made in this file, and it is
 * cheaper to find at `next build` than as a wrong number on the pricing page.
 * It cannot fire at runtime on real traffic; the data is a constant.
 */
for (const plan of STATIC_PLANS) {
  for (const [orgType, tiers] of Object.entries(plan.prices)) {
    if (tiers && !sortTiers(tiers)) {
      throw new Error(
        `lib/plans.ts: ${plan.key} has malformed ${orgType} tiers — ceilings must be unique with at most one "inf".`,
      );
    }
    if (tiers && sortTiers(tiers)?.some((t, i) => t !== tiers[i])) {
      throw new Error(
        `lib/plans.ts: ${plan.key} ${orgType} tiers are out of order — cheapest band first, "inf" last.`,
      );
    }
  }
}
