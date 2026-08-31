/**
 * Market ticker data.
 *
 * Deliberately percentages only. The benchmark rates themselves are the
 * product, so the public strip shows direction and magnitude of movement
 * and nothing that would substitute for signing in.
 *
 * ⚠ THESE ARE ILLUSTRATIVE VALUES, NOT A LIVE FEED. `isLive` gates the
 * "live" treatment in the UI: while it is false the strip presents
 * itself as indicative rather than real time. Do not flip it to true
 * until `rows` is populated from the Insights rate service, because a
 * ticker that looks live while showing frozen numbers misleads the
 * people it is meant to convince.
 */

export type TickerRow = {
  /** Equipment type or commodity group. */
  label: string;
  /** Percentage move; sign drives both the arrow and the colour. */
  change: number;
};

export const isLive = false;

/** Window the movement is measured over, shown beside the label. */
export const period = "30d";

export const rows: TickerRow[] = [
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
