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

const INSIGHTS_ORIGIN = (
  configuredOrigin || DEFAULT_INSIGHTS_ORIGIN
).replace(/\/+$/, "");

export const SIGN_IN_URL = `${INSIGHTS_ORIGIN}/api/auth/sign-in`;
export const SIGN_UP_URL = `${INSIGHTS_ORIGIN}/api/auth/sign-up`;
