/**
 * Market ticker data.
 *
 * Deliberately percentages only. The benchmark rates themselves are the
 * product, so the public strip shows direction and magnitude of movement
 * and nothing that would substitute for signing in.
 *
 * Live values come from the Insights private feed (`getTicker` in
 * `lib/ticker-feed.ts`). The rows below are the fallback the strip renders
 * when that feed is unreachable, and they are illustrative — which is why
 * anything rendering them must carry `isLive: false`.
 */

export type TickerRow = {
  /** Equipment type or commodity group. */
  label: string;
  /** Percentage move; sign drives both the arrow and the colour. */
  change: number;
};

/** Window the movement is measured over, shown beside the label. */
export const period = "30d";

/**
 * Illustrative values, shown only when the live feed cannot be reached.
 *
 * Never rendered as live: the one place that returns them (`getTicker`'s
 * failure path) pairs them with `isLive: false`, and the strip then labels
 * itself indicative. Showing stale-but-real numbers as live would be worse
 * than showing these.
 */
export const fallbackRows: TickerRow[] = [
  { label: "Hopper", change: 2.1 },
  { label: "End dump", change: -0.8 },
  { label: "Walking floor", change: 1.4 },
  { label: "Belt", change: 0.0 },
  { label: "Pneumatic", change: 3.2 },
  { label: "Grain", change: 1.9 },
  { label: "Feed ingredients", change: -1.2 },
  { label: "Aggregates", change: 0.6 },
  { label: "Fertilizer", change: -2.4 },
];
