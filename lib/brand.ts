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
 * Account entry points. Both redirect into the hosted auth at
 * auth.bulkloads.com.
 */
export const SIGN_IN_URL = "https://v2.bulkloads.com/sign-in";
export const SIGN_UP_URL = "https://v2.bulkloads.com/sign-up";
