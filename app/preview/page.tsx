import Image from "next/image";
import { Check, Phone, Mail, TrendingUp, BarChart3, Truck, Anchor, ArrowRight } from "lucide-react";
import BookingModal from "@/components/BookingModal";

const perks = [
  {
    title: "Price with confidence.",
    body: "Low, average, and high rates across 33 commodities and 5 trailer types.",
  },
  {
    title: "Defend every bid.",
    body: "Confidence-scored benchmarks built from 14 years of settled freight.",
  },
  {
    title: "Get paid what you're worth.",
    body: "Fuel-adjusted rates with cost-per-mile baked in so you know your true margin.",
  },
  {
    title: "Stay ahead of the market.",
    body: "Regional load volume and commodity trends show where freight is heating up.",
  },
];

const features = [
  {
    icon: Truck,
    tag: "Rate Intelligence",
    title: "Rating Tool",
    description:
      "Geo-fenced lane rates with equipment-type matching. Get low, average, and high benchmarks with confidence scoring on every estimate.",
    mockup: "rating",
  },
  {
    icon: Anchor,
    tag: "Waterway Markets",
    title: "Barge Data",
    description:
      "Spot vs. 3-month forward curves for every major river terminal. Spot the spread before competitors do.",
    mockup: "barge",
  },
  {
    icon: TrendingUp,
    tag: "Multi-Modal",
    title: "Grain Transport Cost",
    description:
      "$/ton by mode — truck, shuttle train, barge, Gulf vessel, Pacific vessel — on a single chart so you always know the cheapest move.",
    mockup: "grain",
  },
  {
    icon: BarChart3,
    tag: "Market Trends",
    title: "Commodity Trends",
    description:
      "Rate trends by commodity group over 3, 6, 9, or 12 months. Know which markets are heating up before the freight moves.",
    mockup: "commodity",
  },
];

function RatingMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0a0e17]">
        <div className="h-7 w-7 rounded-md bg-amber-400/20 flex items-center justify-center">
          <div className="h-3 w-3 rounded-sm bg-amber-400" />
        </div>
        <span className="text-white text-sm font-semibold">Rating Tool</span>
      </div>
      {/* Inputs row */}
      <div className="flex gap-2 p-3 border-b border-white/5">
        <div className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white/70">Gallatin, Missouri</div>
        <div className="flex items-center px-1 text-amber-400 text-xs">⇄</div>
        <div className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white/70">Monett, Missouri</div>
        <div className="rounded-lg bg-amber-400 px-3 py-2 text-xs text-[#0a0e17] font-bold ml-1">Get Estimate</div>
      </div>
      {/* Content */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="col-span-2">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2 font-mono">Rate Estimate — Hopper</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-center">
              <div className="text-[9px] text-emerald-400 font-mono uppercase tracking-wider">Low</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">$3.22</div>
              <div className="text-[9px] text-white/40 mt-0.5">per mile</div>
              <div className="text-sm font-semibold text-emerald-400 mt-2">$802</div>
              <div className="text-[9px] text-white/40">total</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <div className="text-[9px] text-white/50 font-mono uppercase tracking-wider">Avg</div>
              <div className="text-lg font-bold text-white mt-1">$3.60</div>
              <div className="text-[9px] text-white/40 mt-0.5">per mile</div>
              <div className="text-sm font-semibold text-white mt-2">$896</div>
              <div className="text-[9px] text-white/40">total</div>
            </div>
            <div className="rounded-xl border border-orange-500/40 bg-orange-500/10 p-3 text-center">
              <div className="text-[9px] text-orange-400 font-mono uppercase tracking-wider">High</div>
              <div className="text-lg font-bold text-orange-400 mt-1">$3.98</div>
              <div className="text-[9px] text-white/40 mt-0.5">per mile</div>
              <div className="text-sm font-semibold text-orange-400 mt-2">$991</div>
              <div className="text-[9px] text-white/40">total</div>
            </div>
          </div>
          <div className="mt-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
            <div className="text-[10px] text-emerald-400 font-semibold">Confidence: 100/100 — Geo-fenced lane + equipment type match</div>
            <div className="text-[10px] text-white/40 mt-0.5">Based on shipments within the geo-fence radius for this equipment type.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BargeMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0a0e17]">
        <div className="h-7 w-7 rounded-md bg-amber-400/20 flex items-center justify-center">
          <div className="h-3 w-3 rounded-sm bg-amber-400" />
        </div>
        <span className="text-white text-sm font-semibold">Barge Data</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] text-white/50">Location: <span className="text-white">St. Louis</span></div>
          <div className="flex gap-1">
            {["3M","6M","9M","12M"].map(t => (
              <button key={t} className={`text-[9px] px-2 py-1 rounded font-mono ${t === "6M" ? "bg-white text-[#0a0e17] font-bold" : "bg-white/10 text-white/50"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-3">Spot vs 3-Month Forward — St. Louis</div>
        {/* Chart area */}
        <div className="relative h-32 rounded-lg bg-white/3 overflow-hidden">
          <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
            {/* Brown fill area */}
            <path d="M0,60 C30,55 60,40 90,35 C120,30 150,25 180,30 C210,35 240,40 270,50 L300,55 L300,100 L0,100 Z" fill="rgba(120,53,15,0.6)" />
            {/* Blue line (spot) */}
            <path d="M0,40 C30,38 60,32 90,28 C120,24 150,22 180,24 C210,26 240,30 270,32 L300,25" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Green line (forward) */}
            <path d="M0,48 C30,46 60,38 90,34 C120,30 150,28 180,30 C210,32 240,36 270,40 L300,38" fill="none" stroke="#84cc16" strokeWidth="1.5" />
            {/* Orange line (spread) */}
            <path d="M0,60 C30,55 60,40 90,35 C120,30 150,25 180,30 C210,35 240,40 270,50 L300,55" fill="none" stroke="#f97316" strokeWidth="1.5" />
          </svg>
          <div className="absolute right-2 top-2 flex flex-col gap-0.5">
            <span className="text-[9px] text-emerald-400 font-mono">+85</span>
            <span className="text-[9px] text-white/30 font-mono">+0</span>
            <span className="text-[9px] text-red-400 font-mono">-85</span>
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          {[["spread","#f97316"],["spot","#3b82f6"],["forward","#84cc16"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1">
              <div className="h-0.5 w-3 rounded" style={{ backgroundColor: color }} />
              <span className="text-[9px] text-white/40 font-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GrainMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0a0e17]">
        <div className="h-7 w-7 rounded-md bg-amber-400/20 flex items-center justify-center">
          <div className="h-3 w-3 rounded-sm bg-amber-400" />
        </div>
        <span className="text-white text-sm font-semibold">Grain Transport Cost</span>
        <div className="ml-auto flex gap-1">
          {["3M","6M","9M","12M"].map(t => (
            <button key={t} className={`text-[9px] px-2 py-1 rounded font-mono ${t === "6M" ? "bg-white text-[#0a0e17] font-bold" : "bg-white/10 text-white/50"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-3">$/Ton by Mode</div>
        <div className="relative h-36 rounded-lg overflow-hidden">
          <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
            <text x="4" y="12" fill="rgba(255,255,255,0.2)" fontSize="7">$245</text>
            <text x="4" y="40" fill="rgba(255,255,255,0.2)" fontSize="7">$210</text>
            <text x="4" y="68" fill="rgba(255,255,255,0.2)" fontSize="7">$175</text>
            <text x="4" y="96" fill="rgba(255,255,255,0.2)" fontSize="7">$140</text>
            {/* Grid lines */}
            <line x1="20" y1="10" x2="300" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="20" y1="38" x2="300" y2="38" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="20" y1="66" x2="300" y2="66" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="20" y1="94" x2="300" y2="94" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            {/* Barge - teal, highest */}
            <path d="M20,72 C60,68 80,50 110,40 C140,30 160,20 190,18 C210,32 240,50 280,50" fill="none" stroke="#14b8a6" strokeWidth="1.5" />
            {/* Truck - orange */}
            <path d="M20,88 C60,88 100,87 140,87 C170,87 200,76 240,68 L280,66" fill="none" stroke="#f97316" strokeWidth="1.5" />
            {/* Gulf Vessel - purple */}
            <path d="M20,88 C60,88 100,88 140,86 C170,82 200,78 240,76 L280,74" fill="none" stroke="#a855f7" strokeWidth="1.5" />
            {/* Pacific Vessel - pink */}
            <path d="M20,88 C60,88 100,88 140,87 C170,85 200,82 240,78 L280,76" fill="none" stroke="#ec4899" strokeWidth="1.5" />
            {/* Shuttle Train - blue, lowest */}
            <path d="M20,90 C60,84 100,82 140,82 C170,82 210,83 240,84 L280,84" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          {[["Truck","#f97316"],["Shuttle Train","#3b82f6"],["Barge","#14b8a6"],["Gulf Vessel","#a855f7"],["Pacific Vessel","#ec4899"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1">
              <div className="h-0.5 w-3 rounded" style={{ backgroundColor: color }} />
              <span className="text-[9px] text-white/40 font-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommodityMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0a0e17]">
        <div className="h-7 w-7 rounded-md bg-amber-400/20 flex items-center justify-center">
          <div className="h-3 w-3 rounded-sm bg-amber-400" />
        </div>
        <span className="text-white text-sm font-semibold">Commodity Trends</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Rate Trends by Commodity Group</div>
          <div className="flex gap-1">
            {["3M","6M","9M","12M"].map(t => (
              <button key={t} className={`text-[9px] px-2 py-1 rounded font-mono ${t === "12M" ? "bg-white text-[#0a0e17] font-bold" : "bg-white/10 text-white/50"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="relative h-32 rounded-lg overflow-hidden">
          <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
            {["20","40","60","80"].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            ))}
            {/* Aggregates & Industrial - blue, climbs highest */}
            <path d="M0,60 C30,58 60,56 90,52 C120,48 150,46 180,44 C210,40 240,30 280,15" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Grain - green */}
            <path d="M0,55 C30,54 60,56 90,54 C120,52 150,53 180,52 C210,51 240,45 280,48" fill="none" stroke="#22c55e" strokeWidth="1.5" />
            {/* Other - gray */}
            <path d="M0,58 C30,60 60,64 90,62 C120,60 150,61 180,60 C210,60 240,55 280,52" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
            {/* Feed Ingredients - orange */}
            <path d="M0,58 C30,57 60,58 90,60 C120,61 150,62 180,62 C210,58 240,50 280,54" fill="none" stroke="#f97316" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="flex gap-3 mt-2 flex-wrap">
          {[["Grain","#22c55e"],["Feed Ingredients","#f97316"],["Aggregates & Industrial","#3b82f6"],["Other","#9ca3af"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[9px] text-white/50 font-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mockupMap: Record<string, React.ReactNode> = {
  rating: <RatingMockup />,
  barge: <BargeMockup />,
  grain: <GrainMockup />,
  commodity: <CommodityMockup />,
};

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-[#08101c]">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="relative border-b border-white/5 bg-[#08101c]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#08101c" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div>
              <div className="font-display font-bold text-white text-base leading-none">BulkLoads</div>
              <div className="text-[9px] font-mono text-amber-400 uppercase tracking-[0.2em] leading-none mt-0.5">Bulk Insights</div>
            </div>
          </div>

          {/* Nav hint */}
          <div className="hidden sm:flex items-center gap-6">
            <span className="text-xs text-white/40 font-mono">14 years of real bulk freight data</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Live Market Data</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-64 bg-gradient-to-b from-amber-400/40 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 mb-6 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Powered by BulkLoads Data Network
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-gradient-steel tracking-tight leading-[1.03]">
            The market intelligence
            <br />
            <span className="text-gradient-amber">bulk freight deserves.</span>
          </h1>

          <p className="mt-6 text-lg text-navy-200 max-w-2xl mx-auto leading-relaxed">
            Rate benchmarks, barge data, multi-modal cost comparisons, and commodity trends — all built from 14 years of real settled freight in the BulkLoads network.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-[#08101c] font-bold text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-amber-500/30 cursor-pointer hover:bg-amber-300 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Schedule a Demo
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
            <div className="text-xs font-mono text-white/30">No commitment · 30 minutes · See your lanes live</div>
          </div>

          {/* Trust bar */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              ["14 yrs", "of settled freight data"],
              ["33", "commodities covered"],
              ["5", "equipment types"],
            ].map(([num, label]) => (
              <div key={num} className="text-center">
                <div className="font-display font-bold text-2xl text-amber-400">{num}</div>
                <div className="text-[10px] text-white/40 font-mono mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE SHOWCASE ───────────────────────────────── */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 mb-3">What&apos;s Inside</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gradient-steel">
              Four tools. One platform.
            </h2>
            <p className="mt-3 text-navy-300 max-w-xl mx-auto text-sm leading-relaxed">
              Built specifically for bulk freight — not repurposed TL data dressed up in a dashboard.
            </p>
          </div>

          <div className="space-y-20">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Text side */}
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1.5 mb-4">
                    <feat.icon className="h-3 w-3" />
                    {feat.tag}
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-navy-300 leading-relaxed mb-6">
                    {feat.description}
                  </p>
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold cursor-pointer hover:text-amber-300 transition-colors">
                    See it in your demo <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Mockup side */}
                <div className={`relative ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="absolute -inset-4 bg-amber-400/5 rounded-3xl blur-2xl" />
                  <div className="relative">
                    {mockupMap[feat.mockup]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-white/5" />
      </div>

      {/* ── CTA / BOOKING (unchanged funnel) ───────────────── */}
      <section id="book" className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-400/40 via-amber-400/10 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-amber-400/20 shadow-2xl shadow-amber-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
            <div className="absolute inset-0 bg-grid-light [background-size:48px_48px] opacity-30" />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />

            <div className="relative p-8 lg:p-14 text-center">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                See It For Yourself
              </div>

              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-gradient-steel tracking-tight leading-[1.03] max-w-3xl mx-auto">
                Ready to make confident,
                <br />
                <span className="text-gradient-amber">profitable decisions?</span>
              </h2>

              <p className="mt-6 text-lg text-navy-200 max-w-2xl mx-auto leading-relaxed">
                Tighter margins. Rising costs. A market that won&apos;t sit still. 14 years of real bulk freight data, built to help carriers, brokers, and shippers price with confidence and get paid fairly.
              </p>

              <div className="mt-12 grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto text-left">
                {perks.map((p) => (
                  <div
                    key={p.title}
                    className="relative p-5 rounded-xl bg-navy-950/40 border border-white/5 hover:border-amber-400/30 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-6 w-6 rounded-lg bg-amber-400 text-navy-950 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/20">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-bold text-white text-[15px] leading-snug">{p.title}</div>
                        <p className="mt-1.5 text-[13px] text-navy-300 leading-relaxed">{p.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 max-w-sm mx-auto">
                <BookingModal />
                <p className="mt-4 text-xs font-mono text-amber-400/80 italic tracking-wide">
                  Built to help our partners win.
                </p>
              </div>

              {/* Host card */}
              <div className="mt-12 max-w-xl mx-auto">
                <div className="relative p-6 lg:p-7 rounded-2xl bg-gradient-to-br from-navy-950/80 to-navy-900/60 border border-amber-400/20 overflow-hidden text-left">
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
                  <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="relative flex-shrink-0 self-center sm:self-start">
                      <div className="h-20 w-20 rounded-full overflow-hidden ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20">
                        <Image src="/john-calloway.png" alt="John F. Calloway" width={160} height={160} className="h-full w-full object-cover" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-400 border-2 border-navy-900" />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-amber-400 mb-1.5">Your Host</div>
                      <div className="font-display font-bold text-white text-lg leading-tight">John F. Calloway</div>
                      <div className="text-xs text-amber-400/90 font-mono mt-0.5">Growth Architect, Enterprise</div>
                      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-start">
                        <a href="tel:+14175226740" className="flex items-center gap-1.5 text-[13px] text-navy-100 hover:text-amber-300 transition-colors group">
                          <Phone className="h-3.5 w-3.5 text-amber-400/70 group-hover:text-amber-400" strokeWidth={2.5} />
                          <span className="font-mono">417.522.6740</span>
                        </a>
                        <a href="mailto:John.c@bulkloads.com" className="flex items-center gap-1.5 text-[13px] text-navy-100 hover:text-amber-300 transition-colors group">
                          <Mail className="h-3.5 w-3.5 text-amber-400/70 group-hover:text-amber-400" strokeWidth={2.5} />
                          <span className="font-mono">John.c@bulkloads.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-amber-400 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#08101c" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="text-sm font-display font-semibold text-white">BulkLoads</span>
            <span className="text-xs text-white/30 font-mono">· Bulk Insights</span>
          </div>
          <p className="text-[11px] text-white/25 font-mono">
            © {new Date().getFullYear()} BulkLoads. Market data for bulk freight professionals.
          </p>
        </div>
      </footer>
    </main>
  );
}
