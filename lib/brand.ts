/**
 * Bulk Insights design tokens.
 *
 * Structure (type, spacing, shape, band rotation) is inherited from the
 * BulkLoads v2 public site, which FlatLoads also matches.
 *
 * COLOUR IS DELIBERATELY NARROW. There is exactly one orange and one
 * green, both sampled from the BulkLoads wordmark itself. Earlier drafts
 * accumulated four near-identical oranges for different contrast
 * situations; that reads as sloppiness, not range. The rule below removes
 * the need for variants entirely.
 */

export const brand = {
  /* ── Surfaces ─────────────────────────────────────────────── */
  /** Warm near-black. Hero, dark bands, footer. */
  ink: "#131312",
  white: "#ffffff",
  /** Warm off-white. The default page ground, not pure white. */
  offWhite: "#fbfbf9",
  /** Third band, one step warmer and darker. */
  band: "#f6f6f2",
  border: "#e1e1da",
  borderOnDark: "rgba(255,255,255,0.14)",

  /* ── Type ─────────────────────────────────────────────────── */
  text: "#131312",
  textBody: "#36362f",
  /** AA on white (5.38:1) and on both warm bands. */
  textMuted: "#6b6b61",
  textOnDark: "#d2d2c8",
  textOnDarkMuted: "#9a9a90",

  /* ── Brand ────────────────────────────────────────────────── */
  /**
   * THE BulkLoads orange, sampled from the wordmark. One value, used two
   * ways, and the contrast maths is what decides which:
   *
   *   as a FILL  -> ink text on it        6.92:1  ✓
   *   as TEXT    -> on the ink band       6.92:1  ✓
   *   as TEXT    -> on white              2.69:1  ✗  never do this
   *
   * So: orange fills carry dark text, orange type only appears on dark
   * grounds, and accent type on light surfaces uses `textMuted` instead.
   * White text on orange also fails (2.69:1) and is never correct.
   */
  orange: "#f37e21",
  /** Hover state of the same colour, not a second brand orange. */
  orangeHover: "#dd6f14",

  /** BulkLoads green, also from the wordmark. Confidence and positive signals. */
  green: "#95c93f",

  /* ── Shape ────────────────────────────────────────────────── */
  radiusButton: "10px",
  radiusCard: "16px",

  /* ── Layout ───────────────────────────────────────────────── */
  container: "1248px",
  containerPad: "32px",
  sectionY: "112px",
} as const;

/**
 * Account entry points: the Insights front door (ENG-1177), which owns
 * the WorkOS handoff. Sign-in returns existing customers to the app;
 * sign-up routes new ones through org creation and the plan picker.
 *
 * The origin is overridable so preview builds can target a preview
 * deployment of Insights; the /api/auth/* paths are Insights' contract.
 * NEXT_PUBLIC_ vars are inlined at build time, so changing the value
 * requires a redeploy.
 *
 * An EMPTY override falls back too, which `??` would not do. A variable
 * that exists with a blank value is ordinary in Vercel, and `"" ?? x` is
 * `""` — which would leave these as bare paths like `/api/auth/sign-in`.
 * `next/link` reads a leading slash as an internal route, so every Sign
 * in and Sign up control would prefetch and then 404 against this site
 * instead of reaching WorkOS, and being build-time inlined it would stay
 * broken until someone redeployed.
 */
const DEFAULT_INSIGHTS_ORIGIN = "https://insights.bulkloads.com";

const configuredOrigin = process.env.NEXT_PUBLIC_INSIGHTS_URL?.trim();

/**
 * Exported because it is also where the plan prices come from:
 * `lib/insights-plans.ts` fetches `/api/public/plans` off this same origin at
 * build time. One origin for the handoff and the catalog, so a preview build
 * pointed at a preview of Insights gets that deployment's prices too.
 */
export const INSIGHTS_ORIGIN = (
  configuredOrigin || DEFAULT_INSIGHTS_ORIGIN
).replace(/\/+$/, "");

export const SIGN_IN_URL = `${INSIGHTS_ORIGIN}/api/auth/sign-in`;
export const SIGN_UP_URL = `${INSIGHTS_ORIGIN}/api/auth/sign-up`;

/**
 * How Insights prices an organization. Singular, unlike the page slugs:
 * `/carriers` sells to a `carrier`.
 *
 * The runtime tuple is the declaration and the type is derived from it, so a
 * fourth type is added in one place. They used to be separate — the union here,
 * and a hardcoded list inside the plan fetcher — which meant a type added to
 * this file would compile everywhere and simply never be read off the wire,
 * leaving that persona's prices on the static mirror with nothing saying why.
 */
export const ORG_TYPES = ["carrier", "broker", "shipper"] as const;

export type OrgType = (typeof ORG_TYPES)[number];

/** What the visitor already told us by being on the page they are on. */
export type AuthIntent = {
  orgType?: OrgType;
  /** A self-serve package key, set when a specific plan card was clicked. */
  plan?: string;
  seats?: number;
  /** utm_* and click ids lifted off this page's own query string. */
  attribution?: Readonly<Record<string, string>>;
  /**
   * The funnel's GA4 client_id, read off the `_ga` cookie in the browser.
   * Forwarded as `ga_cid` inside `next` so Insights adopts it and the
   * marketing-to-checkout journey is one GA session across the two domains
   * (the WorkOS redirect otherwise drops GA's own `_gl` linker).
   */
  gaClientId?: string;
};

const UPGRADE_PATH = "/upgrade";

/**
 * The handoff on the Insights side forwards exactly one thing: `next`. It is
 * allow-listed by pathname and its query string is carried through intact, so
 * that value is the only channel anything here has into the app. Anything hung
 * off the auth URL itself is read for `next` and then dropped.
 *
 * Null when there is no intent to carry. An unknown ICP must not manufacture a
 * `next`, because the destination it would override is the one the handoff
 * picks on its own: org creation for a new account, the app for a returning
 * one.
 */
function upgradeNext(intent: AuthIntent): string | null {
  const params = new URLSearchParams();
  if (intent.plan) params.set("package", intent.plan);
  if (intent.seats) params.set("seats", String(intent.seats));
  if (intent.orgType) params.set("org_type", intent.orgType);
  if ([...params].length === 0) return null;

  // Attribution rides along only once there is a destination to ride to. On
  // its own it is not a reason to redirect anyone.
  for (const [key, value] of Object.entries(intent.attribution ?? {})) {
    params.set(key, value);
  }
  // Same rule as attribution: carried only when a destination already exists,
  // so it lands on `/upgrade` for Insights to stitch the GA session onto.
  if (intent.gaClientId) params.set("ga_cid", intent.gaClientId);
  return `${UPGRADE_PATH}?${params}`;
}

/**
 * An account entry point carrying whatever the funnel knows about the visitor.
 *
 * Attribution is written twice on purpose: inside `next`, which is what
 * actually survives into the app, and on the auth URL itself, which today's
 * handoff ignores but which is where a campaign parameter belongs and costs
 * nothing to have in place already.
 */
export function authUrl(
  action: "sign-in" | "sign-up",
  intent: AuthIntent = {},
): string {
  const base = action === "sign-in" ? SIGN_IN_URL : SIGN_UP_URL;
  const params = new URLSearchParams();
  const next = upgradeNext(intent);
  if (next) params.set("next", next);
  for (const [key, value] of Object.entries(intent.attribution ?? {})) {
    params.set(key, value);
  }
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}
