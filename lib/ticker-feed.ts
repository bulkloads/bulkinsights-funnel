import { fallbackRows, period, type TickerRow } from "@/lib/ticker";

/**
 * Server-side reader for the Insights private ticker feed.
 *
 * **Server only.** `TICKER_FEED_SECRET` carries no `NEXT_PUBLIC_` prefix, so
 * Next never inlines it into a client bundle — importing this from a client
 * component would leave the secret undefined and every request unauthorised,
 * rather than leaking it. Keep the only caller a server component regardless.
 *
 * The feed is deliberately unlisted on the Insights side: a wrong or missing
 * secret answers 404, exactly as an unknown path does. So a 404 here is not
 * evidence of a bad URL — it is the same answer a bad secret gets.
 */

const DEFAULT_TICKER_URL = "https://insights.bulkloads.com/api/internal/ticker";

/**
 * Revalidation window. One request an hour for the whole site, not one per
 * visitor: the underlying rates only move on the nightly sync, so anything
 * under a day is fresh and an hour keeps the page comfortably static.
 */
const REVALIDATE_SECONDS = 3600;

/** Give up rather than hold a page render open on a slow upstream. */
const TIMEOUT_MS = 5000;

export type TickerData = {
  rows: TickerRow[];
  period: string;
  /** True only when `rows` came from the feed. Gates the "live" treatment. */
  isLive: boolean;
};

/** The illustrative strip, explicitly not live. Every failure path returns this. */
function indicative(): TickerData {
  return { rows: fallbackRows, period, isLive: false };
}

/**
 * Fall back, and say why.
 *
 * Silence here is the dangerous failure mode: the page still renders, the
 * strip still looks like instrumentation, and it shows the same nine
 * hardcoded percentages forever. A typo in `TICKER_FEED_SECRET` is
 * indistinguishable from a working deploy unless something is written down —
 * and because the feed is unlisted, a wrong secret answers 404 exactly as a
 * wrong URL does. One line on the server log is what makes it findable.
 */
function degraded(reason: string): TickerData {
  console.warn(`[ticker] falling back to indicative rows: ${reason}`);
  return indicative();
}

/**
 * Narrow an unknown JSON body to ticker rows.
 *
 * The payload crosses a network boundary, so its shape is checked rather than
 * assumed — a malformed `change` reaching the strip would render as `NaN%`.
 * An empty row set is treated as a failure: the feed suppresses labels it
 * cannot measure, and a response that suppressed everything is not something
 * to present as a live market.
 */
function parseRows(body: unknown): TickerRow[] | null {
  if (typeof body !== "object" || body === null) return null;
  const rows = (body as { rows?: unknown }).rows;
  if (!Array.isArray(rows) || rows.length === 0) return null;

  const parsed: TickerRow[] = [];
  for (const row of rows) {
    if (typeof row !== "object" || row === null) return null;
    const { label, change } = row as { label?: unknown; change?: unknown };
    if (typeof label !== "string" || label.length === 0) return null;
    if (typeof change !== "number" || !Number.isFinite(change)) return null;
    parsed.push({ label, change });
  }
  return parsed;
}

/**
 * The window the feed measured, when it states one the strip can print.
 *
 * Falls back to the local constant rather than failing the whole response: an
 * unexpected period is a caption problem, not a reason to drop live numbers.
 */
function parsePeriod(body: unknown): string {
  const value = (body as { period?: unknown })?.period;
  return typeof value === "string" && value.length > 0 && value.length <= 8 ? value : period;
}

/**
 * Fetch the live strip, falling back to the illustrative rows on any failure —
 * unset secret, network error, timeout, non-200, or a body that does not parse.
 *
 * Never throws. A marketing page must render whatever the feed is doing.
 */
export async function getTicker(): Promise<TickerData> {
  const secret = process.env.TICKER_FEED_SECRET;
  if (!secret) return degraded("TICKER_FEED_SECRET is not set");

  const url = process.env.INSIGHTS_TICKER_URL ?? DEFAULT_TICKER_URL;

  // The timeout is a race rather than an `AbortSignal` on the request.
  // `signal` is documented as interfering with Next's fetch cache, and
  // losing the cache here would turn "one upstream request an hour for the
  // whole site" into one per render against a private endpoint. The race
  // gives the same ceiling without touching the request options.
  //
  // The timer is cleared in `finally` so a fast response does not leave a
  // five-second handle pending in a serverless invocation.
  let timer: ReturnType<typeof setTimeout> | undefined;

  try {
    const res = await Promise.race([
      fetch(url, {
        headers: { Authorization: `Bearer ${secret}` },
        // ISR: one upstream request per revalidation window for the whole site.
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`timed out after ${TIMEOUT_MS}ms`)),
          TIMEOUT_MS,
        );
      }),
    ]);
    // A 404 is what a wrong secret gets, same as an unknown path — so this
    // line is the difference between a misconfigured deploy and a working
    // one, and it is worth saying out loud.
    if (!res.ok) return degraded(`feed answered ${res.status}`);

    const body: unknown = await res.json();
    const rows = parseRows(body);
    if (!rows) return degraded("feed body did not parse as ticker rows");

    return { rows, period: parsePeriod(body), isLive: true };
  } catch (error) {
    return degraded(error instanceof Error ? error.message : "feed request failed");
  } finally {
    clearTimeout(timer);
  }
}
