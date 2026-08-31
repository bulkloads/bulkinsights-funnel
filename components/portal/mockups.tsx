import { brand } from "@/lib/brand";

/* Product mockups. These stay dark because they mirror the real Bulk Insights
   UI, and read as screenshots against the light marketing pages. */

export function MockupShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      data-mockup=""
      className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5"
      style={{ background: "#1c1b18" }}
    >
      <div
        className="flex items-center gap-3 border-b border-white/10 px-4 py-3"
        style={{ background: "#141310" }}
      >
        <div
          className="flex h-7 w-7 items-center justify-center rounded-md"
          style={{ background: "rgba(254,152,0,0.2)" }}
        >
          <div className="h-3 w-3 rounded-sm" style={{ background: brand.orange }} />
        </div>
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function RatingMockup() {
  return (
    <MockupShell title="Rating Tool">
      <div className="flex gap-2 border-b border-white/5 p-3">
        <div
          className="min-w-0 flex-1 truncate rounded-lg px-3 py-2 text-xs text-white/70"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Gallatin, Missouri
        </div>
        <div className="flex items-center px-1 text-xs" style={{ color: brand.orange }}>
          ⇄
        </div>
        <div
          className="min-w-0 flex-1 truncate rounded-lg px-3 py-2 text-xs text-white/70"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Monett, Missouri
        </div>
        <div
          className="ml-1 rounded-lg px-3 py-2 text-xs font-bold"
          style={{ background: brand.orange, color: brand.ink }}
        >
          Get Estimate
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 text-[10px] uppercase tracking-wider text-white/40">
          Rate Estimate: Hopper
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div
            className="rounded-xl p-3 text-center"
            style={{ border: "1px solid rgba(149,201,61,0.3)", background: "rgba(149,201,61,0.06)" }}
          >
            <div className="text-[9px] uppercase tracking-wider" style={{ color: brand.green }}>
              Low
            </div>
            <div className="mt-1 text-lg font-bold" style={{ color: brand.green }}>
              $3.22
            </div>
            <div className="mt-0.5 text-[9px] text-white/40">per mile</div>
            <div className="mt-2 text-sm font-semibold" style={{ color: brand.green }}>
              $802
            </div>
            <div className="text-[9px] text-white/40">total</div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
          >
            <div className="text-[9px] uppercase tracking-wider text-white/50">Avg</div>
            <div className="mt-1 text-lg font-bold text-white">$3.60</div>
            <div className="mt-0.5 text-[9px] text-white/40">per mile</div>
            <div className="mt-2 text-sm font-semibold text-white">$896</div>
            <div className="text-[9px] text-white/40">total</div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ border: "1px solid rgba(254,152,0,0.4)", background: "rgba(254,152,0,0.1)" }}
          >
            <div className="text-[9px] uppercase tracking-wider" style={{ color: brand.orange }}>
              High
            </div>
            <div className="mt-1 text-lg font-bold" style={{ color: brand.orange }}>
              $3.98
            </div>
            <div className="mt-0.5 text-[9px] text-white/40">per mile</div>
            <div className="mt-2 text-sm font-semibold" style={{ color: brand.orange }}>
              $991
            </div>
            <div className="text-[9px] text-white/40">total</div>
          </div>
        </div>
        <div
          className="mt-2 rounded-lg px-3 py-2"
          style={{ border: "1px solid rgba(149,201,61,0.2)", background: "rgba(149,201,61,0.06)" }}
        >
          <div className="text-[10px] font-semibold" style={{ color: brand.green }}>
            Confidence: 100/100 (geo-fenced lane + equipment type match)
          </div>
          <div className="mt-0.5 text-[10px] text-white/40">
            Based on shipments within the geo-fence radius for this equipment type.
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function CommodityMockup() {
  return (
    <MockupShell title="Commodity Trends">
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-wider text-white/40">
            Rate Trends by Commodity Group
          </div>
          <div className="flex gap-1">
            {["3M", "6M", "9M", "12M"].map((t) => (
              <button
                key={t}
                className="rounded px-2 py-1 text-[9px]"
                style={
                  t === "12M"
                    ? { background: brand.orange, color: brand.ink, fontWeight: 700 }
                    : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="relative h-32 overflow-hidden rounded-lg">
          <svg viewBox="0 0 300 100" className="h-full w-full" preserveAspectRatio="none">
            {["20", "40", "60", "80"].map((y, i) => (
              <line
                key={i}
                x1="0"
                y1={y}
                x2="300"
                y2={y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
              />
            ))}
            <path
              d="M0,60 C30,58 60,56 90,52 C120,48 150,46 180,44 C210,40 240,30 280,15"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
            <path
              d="M0,55 C30,54 60,56 90,54 C120,52 150,53 180,52 C210,51 240,45 280,48"
              fill="none"
              stroke={brand.green}
              strokeWidth="1.5"
            />
            <path
              d="M0,58 C30,60 60,64 90,62 C120,60 150,61 180,60 C210,60 240,55 280,52"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="1.5"
            />
            <path
              d="M0,58 C30,57 60,58 90,60 C120,61 150,62 180,62 C210,58 240,50 280,54"
              fill="none"
              stroke={brand.orange}
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          {[
            ["Grain", brand.green],
            ["Feed Ingredients", brand.orange],
            ["Aggregates & Industrial", "#3b82f6"],
            ["Other", "#9ca3af"],
          ].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[9px] text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* The margin tool that sits with the rate results inside the Rating Tool.
   Numbers stay consistent with RatingMockup: 249 mi, $3.60/mi average,
   $896 buy, 15% margin -> $1,054 sell, $158 margin. */
export function MarginMockup() {
  return (
    <MockupShell title="Rating Tool">
      <div className="flex gap-2 border-b border-white/5 p-3">
        <div
          className="min-w-0 flex-1 truncate rounded-lg px-3 py-2 text-xs text-white/70"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Gallatin, Missouri
        </div>
        <div className="flex items-center px-1 text-xs" style={{ color: brand.orange }}>
          ⇄
        </div>
        <div
          className="min-w-0 flex-1 truncate rounded-lg px-3 py-2 text-xs text-white/70"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Monett, Missouri
        </div>
        <div
          className="ml-1 rounded-lg px-3 py-2 text-xs font-bold"
          style={{ background: brand.orange, color: brand.ink }}
        >
          Get Estimate
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="text-[10px] uppercase tracking-wider text-white/40">
            Rate Estimate: Hopper
          </div>
          {/* Margin control, top right of the rate results */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-wider text-white/40">Margin</span>
            {["10%", "15%", "20%"].map((m) => (
              <button
                key={m}
                className="rounded px-2 py-1 text-[9px]"
                style={
                  m === "15%"
                    ? { background: brand.green, color: brand.ink, fontWeight: 700 }
                    : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }
                }
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div
            className="rounded-xl p-2.5 text-center"
            style={{ border: "1px solid rgba(149,201,61,0.3)", background: "rgba(149,201,61,0.06)" }}
          >
            <div className="text-[9px] uppercase tracking-wider" style={{ color: brand.green }}>
              Low
            </div>
            <div className="mt-1 text-base font-bold" style={{ color: brand.green }}>
              $3.22
            </div>
            <div className="text-[9px] text-white/40">per mile</div>
          </div>
          <div
            className="rounded-xl p-2.5 text-center"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
          >
            <div className="text-[9px] uppercase tracking-wider text-white/50">Avg</div>
            <div className="mt-1 text-base font-bold text-white">$3.60</div>
            <div className="text-[9px] text-white/40">per mile</div>
          </div>
          <div
            className="rounded-xl p-2.5 text-center"
            style={{ border: "1px solid rgba(254,152,0,0.4)", background: "rgba(254,152,0,0.1)" }}
          >
            <div className="text-[9px] uppercase tracking-wider" style={{ color: brand.orange }}>
              High
            </div>
            <div className="mt-1 text-base font-bold" style={{ color: brand.orange }}>
              $3.98
            </div>
            <div className="text-[9px] text-white/40">per mile</div>
          </div>
        </div>

        {/* Margin breakdown, driven by the control above */}
        <div
          className="mt-2 grid grid-cols-3 gap-2 rounded-xl p-3"
          style={{ border: "1px solid rgba(149,201,61,0.25)", background: "rgba(149,201,61,0.05)" }}
        >
          <div>
            <div className="text-[9px] uppercase tracking-wider text-white/40">Buy</div>
            <div className="mt-0.5 text-sm font-bold text-white">$896</div>
            <div className="text-[9px] text-white/40">$3.60 / mi</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-white/40">Sell</div>
            <div className="mt-0.5 text-sm font-bold text-white">$1,054</div>
            <div className="text-[9px] text-white/40">$4.23 / mi</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider" style={{ color: brand.green }}>
              Your margin
            </div>
            <div className="mt-0.5 text-sm font-bold" style={{ color: brand.green }}>
              $158
            </div>
            <div className="text-[9px] text-white/40">15% on 249 mi</div>
          </div>
        </div>

        <div
          className="mt-2 rounded-lg px-3 py-2"
          style={{ border: "1px solid rgba(149,201,61,0.2)", background: "rgba(149,201,61,0.06)" }}
        >
          <div className="text-[10px] font-semibold" style={{ color: brand.green }}>
            Confidence: 100/100 (geo-fenced lane + equipment type match)
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
