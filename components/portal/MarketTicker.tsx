import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { brand } from "@/lib/brand";
import { getTicker } from "@/lib/ticker-feed";
import type { TickerRow } from "@/lib/ticker";

function Cell({ row }: { row: TickerRow }) {
  const up = row.change > 0;
  const flat = row.change === 0;
  // Semantic colour, but never the only signal: each row also carries an
  // arrow glyph and a signed number, so the direction survives greyscale
  // and colour blindness.
  const tone = flat ? brand.textOnDarkMuted : up ? brand.green : "#ff8a7a";
  const Icon = flat ? Minus : up ? ArrowUp : ArrowDown;

  return (
    <div className="flex shrink-0 items-baseline gap-2.5 px-6">
      <span
        className="text-[12px] font-medium uppercase tracking-[0.08em]"
        style={{ color: brand.textOnDarkMuted }}
      >
        {row.label}
      </span>
      <span
        className="tabular inline-flex items-baseline gap-0.5 text-[15px] font-semibold"
        style={{ color: tone }}
      >
        <Icon className="h-3 w-3 self-center" strokeWidth={3} aria-hidden="true" />
        {flat ? "0.0" : `${up ? "+" : ""}${row.change.toFixed(1)}`}%
      </span>
    </div>
  );
}

/**
 * Scrolling market strip beneath the hero.
 *
 * The track is rendered twice and translated by half its width, which is
 * what makes the loop seamless. The duplicate is aria-hidden so screen
 * readers hear the list once, and the whole strip stops moving under
 * prefers-reduced-motion, where it becomes a normal scrollable row.
 *
 * A server component: `getTicker` reads the Insights feed with the shared
 * secret, which must never reach the browser, and revalidates hourly rather
 * than per visitor. It never throws — when the feed is unreachable it returns
 * the illustrative rows with `isLive` false, and the strip below then labels
 * itself indicative instead of live.
 */
export default async function MarketTicker() {
  const { rows, period, isLive } = await getTicker();

  const track = (
    <div className="ticker-track flex items-center">
      {rows.map((r) => (
        <Cell key={r.label} row={r} />
      ))}
    </div>
  );

  return (
    <section
      aria-label="Bulk freight rate movement by equipment and commodity"
      className="relative border-y"
      style={{ background: brand.ink, borderColor: "rgba(255,255,255,0.12)" }}
    >
      <div className="flex items-stretch">
        {/* Fixed label, so the strip reads as instrumentation rather than decoration */}
        <div
          className="hidden shrink-0 items-center gap-2.5 border-r px-5 sm:flex sm:px-8"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          {isLive ? (
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                style={{ background: brand.green }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: brand.green }}
              />
            </span>
          ) : null}
          <span className="t-eyebrow whitespace-nowrap" style={{ color: brand.orange }}>
            {isLive ? "Live movement" : `Rate movement · ${period}`}
          </span>
        </div>

        {/* Marquee */}
        <div className="ticker-viewport relative min-w-0 flex-1 overflow-hidden py-3.5">
          <div className="ticker-rail flex w-max">
            {track}
            <div aria-hidden="true" className="contents">
              {track}
            </div>
          </div>
        </div>
      </div>

      {!isLive ? (
        <span className="sr-only">
          Indicative {period} rate movement. Not a live market feed.
        </span>
      ) : null}
    </section>
  );
}
