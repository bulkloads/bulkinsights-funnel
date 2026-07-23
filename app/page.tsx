import Image from "next/image";
import { Check, Phone, Mail, TrendingUp, BarChart3, Truck, Anchor } from "lucide-react";
import BookingModal from "@/components/BookingModal";

const perks = [
  { title: "Price with confidence.", body: "Low, average, and high rates across 33 commodities and 5 trailer types." },
  { title: "Defend every bid.", body: "Confidence-scored benchmarks built from 14 years of settled freight." },
  { title: "Get paid what you're worth.", body: "Fuel-adjusted rates with cost-per-mile baked in so you know your true margin." },
  { title: "Stay ahead of the market.", body: "Regional load volume and commodity trends show where freight is heating up." },
];

const features = [
  { icon: Truck, tag: "Rate Intelligence", title: "Rating Tool", description: "Geo-fenced lane rates with equipment-type matching. Get low, average, and high benchmarks with confidence scoring on every estimate.", mockup: "rating" },
  { icon: Anchor, tag: "Waterway Markets", title: "Barge Data", description: "Spot vs. 3-month forward curves for every major river terminal. Spot the spread before competitors do.", mockup: "barge" },
  { icon: TrendingUp, tag: "Multi-Modal", title: "Grain Transport Cost", description: "Cost per ton by mode — truck, shuttle train, barge, Gulf vessel, Pacific vessel — on a single chart so you always know the most efficient move.", mockup: "grain" },
  { icon: BarChart3, tag: "Market Trends", title: "Commodity Trends", description: "Rate trends by commodity group over 3, 6, 9, or 12 months. Know which markets are heating up before the freight moves.", mockup: "commodity" },
];

function MockupShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ background: "#0e1e2d" }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10" style={{ background: "#0b1827" }}>
        <div className="h-7 w-7 rounded-md flex items-center justify-center" style={{ background: "rgba(244,125,1,0.2)" }}>
          <div className="h-3 w-3 rounded-sm" style={{ background: "#f47d01" }} />
        </div>
        <span className="text-white text-sm font-semibold">{title}</span>
      </div>
      {children}
    </div>
  );
}

function RatingMockup() {
  return (
    <MockupShell title="Rating Tool">
      <div className="flex gap-2 p-3 border-b border-white/5">
        <div className="flex-1 rounded-lg px-3 py-2 text-xs text-white/70" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>Gallatin, Missouri</div>
        <div className="flex items-center px-1 text-xs" style={{ color: "#f47d01" }}>⇄</div>
        <div className="flex-1 rounded-lg px-3 py-2 text-xs text-white/70" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>Monett, Missouri</div>
        <div className="rounded-lg px-3 py-2 text-xs font-bold ml-1" style={{ background: "#f47d01", color: "#0c1d2b" }}>Get Estimate</div>
      </div>
      <div className="p-4">
        <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Rate Estimate: Hopper</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl p-3 text-center" style={{ border: "1px solid rgba(149,201,61,0.3)", background: "rgba(149,201,61,0.06)" }}>
            <div className="text-[9px] uppercase tracking-wider" style={{ color: "#95c93d" }}>Low</div>
            <div className="text-lg font-bold mt-1" style={{ color: "#95c93d" }}>$3.22</div>
            <div className="text-[9px] text-white/40 mt-0.5">per mile</div>
            <div className="text-sm font-semibold mt-2" style={{ color: "#95c93d" }}>$802</div>
            <div className="text-[9px] text-white/40">total</div>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
            <div className="text-[9px] text-white/50 uppercase tracking-wider">Avg</div>
            <div className="text-lg font-bold text-white mt-1">$3.60</div>
            <div className="text-[9px] text-white/40 mt-0.5">per mile</div>
            <div className="text-sm font-semibold text-white mt-2">$896</div>
            <div className="text-[9px] text-white/40">total</div>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ border: "1px solid rgba(244,125,1,0.4)", background: "rgba(244,125,1,0.1)" }}>
            <div className="text-[9px] uppercase tracking-wider" style={{ color: "#f47d01" }}>High</div>
            <div className="text-lg font-bold mt-1" style={{ color: "#f47d01" }}>$3.98</div>
            <div className="text-[9px] text-white/40 mt-0.5">per mile</div>
            <div className="text-sm font-semibold mt-2" style={{ color: "#f47d01" }}>$991</div>
            <div className="text-[9px] text-white/40">total</div>
          </div>
        </div>
        <div className="mt-2 rounded-lg px-3 py-2" style={{ border: "1px solid rgba(149,201,61,0.2)", background: "rgba(149,201,61,0.06)" }}>
          <div className="text-[10px] font-semibold" style={{ color: "#95c93d" }}>Confidence: 100/100 — Geo-fenced lane + equipment type match</div>
          <div className="text-[10px] text-white/40 mt-0.5">Based on shipments within the geo-fence radius for this equipment type.</div>
        </div>
      </div>
    </MockupShell>
  );
}

function BargeMockup() {
  return (
    <MockupShell title="Barge Data">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] text-white/50">Location: <span className="text-white">St. Louis</span></div>
          <div className="flex gap-1">
            {["3M","6M","9M","12M"].map(t => (
              <button key={t} className="text-[9px] px-2 py-1 rounded" style={t === "6M" ? { background: "#f47d01", color: "#0c1d2b", fontWeight: 700 } : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Spot vs 3-Month Forward: St. Louis</div>
        <div className="relative h-32 rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
          <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,60 C30,55 60,40 90,35 C120,30 150,25 180,30 C210,35 240,40 270,50 L300,55 L300,100 L0,100 Z" fill="rgba(120,53,15,0.5)" />
            <path d="M0,40 C30,38 60,32 90,28 C120,24 150,22 180,24 C210,26 240,30 270,32 L300,25" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <path d="M0,48 C30,46 60,38 90,34 C120,30 150,28 180,30 C210,32 240,36 270,40 L300,38" fill="none" stroke="#95c93d" strokeWidth="1.5" />
            <path d="M0,60 C30,55 60,40 90,35 C120,30 150,25 180,30 C210,35 240,40 270,50 L300,55" fill="none" stroke="#f47d01" strokeWidth="1.5" />
          </svg>
          <div className="absolute right-2 top-2 flex flex-col gap-0.5">
            <span className="text-[9px]" style={{ color: "#95c93d" }}>+85</span>
            <span className="text-[9px] text-white/30">+0</span>
            <span className="text-[9px] text-red-400">-85</span>
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          {[["spread","#f47d01"],["spot","#3b82f6"],["forward","#95c93d"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1"><div className="h-0.5 w-3 rounded" style={{ backgroundColor: color }} /><span className="text-[9px] text-white/40">{label}</span></div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

function GrainMockup() {
  return (
    <MockupShell title="Grain Transport Cost">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] text-white/40 uppercase tracking-wider">$/Ton by Mode</div>
          <div className="flex gap-1">
            {["3M","6M","9M","12M"].map(t => (
              <button key={t} className="text-[9px] px-2 py-1 rounded" style={t === "6M" ? { background: "#f47d01", color: "#0c1d2b", fontWeight: 700 } : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="relative h-36 rounded-lg overflow-hidden">
          <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
            <text x="4" y="12" fill="rgba(255,255,255,0.2)" fontSize="7">$245</text>
            <text x="4" y="40" fill="rgba(255,255,255,0.2)" fontSize="7">$210</text>
            <text x="4" y="68" fill="rgba(255,255,255,0.2)" fontSize="7">$175</text>
            <text x="4" y="96" fill="rgba(255,255,255,0.2)" fontSize="7">$140</text>
            <line x1="20" y1="10" x2="300" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" /><line x1="20" y1="38" x2="300" y2="38" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" /><line x1="20" y1="66" x2="300" y2="66" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" /><line x1="20" y1="94" x2="300" y2="94" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <path d="M20,72 C60,68 80,50 110,40 C140,30 160,20 190,18 C210,32 240,50 280,50" fill="none" stroke="#14b8a6" strokeWidth="1.5" />
            <path d="M20,88 C60,88 100,87 140,87 C170,87 200,76 240,68 L280,66" fill="none" stroke="#f47d01" strokeWidth="1.5" />
            <path d="M20,88 C60,88 100,88 140,86 C170,82 200,78 240,76 L280,74" fill="none" stroke="#a855f7" strokeWidth="1.5" />
            <path d="M20,88 C60,88 100,88 140,87 C170,85 200,82 240,78 L280,76" fill="none" stroke="#ec4899" strokeWidth="1.5" />
            <path d="M20,90 C60,84 100,82 140,82 C170,82 210,83 240,84 L280,84" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          {[["Truck","#f47d01"],["Shuttle Train","#3b82f6"],["Barge","#14b8a6"],["Gulf Vessel","#a855f7"],["Pacific Vessel","#ec4899"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1"><div className="h-0.5 w-3 rounded" style={{ backgroundColor: color }} /><span className="text-[9px] text-white/40">{label}</span></div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

function CommodityMockup() {
  return (
    <MockupShell title="Commodity Trends">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] text-white/40 uppercase tracking-wider">Rate Trends by Commodity Group</div>
          <div className="flex gap-1">
            {["3M","6M","9M","12M"].map(t => (
              <button key={t} className="text-[9px] px-2 py-1 rounded" style={t === "12M" ? { background: "#f47d01", color: "#0c1d2b", fontWeight: 700 } : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="relative h-32 rounded-lg overflow-hidden">
          <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
            {["20","40","60","80"].map((y, i) => (<line key={i} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />))}
            <path d="M0,60 C30,58 60,56 90,52 C120,48 150,46 180,44 C210,40 240,30 280,15" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <path d="M0,55 C30,54 60,56 90,54 C120,52 150,53 180,52 C210,51 240,45 280,48" fill="none" stroke="#95c93d" strokeWidth="1.5" />
            <path d="M0,58 C30,60 60,64 90,62 C120,60 150,61 180,60 C210,60 240,55 280,52" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
            <path d="M0,58 C30,57 60,58 90,60 C120,61 150,62 180,62 C210,58 240,50 280,54" fill="none" stroke="#f47d01" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="flex gap-3 mt-2 flex-wrap">
          {[["Grain","#95c93d"],["Feed Ingredients","#f47d01"],["Aggregates & Industrial","#3b82f6"],["Other","#9ca3af"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1"><div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} /><span className="text-[9px] text-white/50">{label}</span></div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

const mockupMap: Record<string, React.ReactNode> = {
  rating: <RatingMockup />,
  barge: <BargeMockup />,
  grain: <GrainMockup />,
  commodity: <CommodityMockup />,
};

export default function Page() {
  return (
    <main className="min-h-screen" style={{ background: "#0c1d2b" }}>

      {/* HEADER */}
      <header className="relative border-b sticky top-0 z-40" style={{ background: "rgba(12,29,43,0.97)", borderColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/bulkloads-logo-transparent.png" alt="BulkLoads" width={130} height={32} className="h-8 w-auto" unoptimized />
          </div>
          <BookingModal variant="header" />
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-64 bg-gradient-to-b from-[#f47d01]/40 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] mb-6 rounded-full px-4 py-2" style={{ color: "#f47d01", background: "rgba(244,125,1,0.1)", border: "1px solid rgba(244,125,1,0.2)" }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#f47d01" }} />
            Powered by BulkLoads Data Network
          </div>
          <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl text-gradient-steel tracking-tight leading-[1.03]">
            The market intelligence<br />
            <span className="text-gradient-orange">bulk freight deserves.</span>
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#8aabd0" }}>
            Rate benchmarks, barge data, multi-modal cost comparisons, and commodity trends built from 14 years of real settled freight in the BulkLoads network.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookingModal variant="hero" />
            <div className="text-xs text-white/25">No commitment · 30 minutes · See your lanes live</div>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[["14 yrs","of settled freight data"],["33","commodities covered"],["5","equipment types"]].map(([num, label]) => (
              <div key={num} className="text-center">
                <div className="font-bold text-2xl" style={{ color: "#f47d01" }}>{num}</div>
                <div className="text-[10px] text-white/40 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: "#f47d01" }}>A Glimpse Inside</div>
            <h2 className="font-bold text-3xl sm:text-4xl text-gradient-steel">Built specifically for bulk freight</h2>
            <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#8aabd0" }}>
              These are just a few of the tools inside Bulk Insights. In your demo, we pull up live data for your lanes and show you everything relevant to your business.
            </p>
          </div>
          <div className="space-y-20">
            {features.map((feat, i) => (
              <div key={feat.title} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] rounded-full px-3 py-1.5 mb-4" style={{ color: "#f47d01", background: "rgba(244,125,1,0.1)", border: "1px solid rgba(244,125,1,0.2)" }}>
                    <feat.icon className="h-3 w-3" />{feat.tag}
                  </div>
                  <h3 className="font-bold text-2xl sm:text-3xl text-white mb-3">{feat.title}</h3>
                  <p className="leading-relaxed mb-6" style={{ color: "#8aabd0" }}>{feat.description}</p>
                  <BookingModal variant="hero" />
                </div>
                <div className={`relative ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{ background: "rgba(244,125,1,0.05)" }} />
                  <div className="relative">{mockupMap[feat.mockup]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/5" /></div>

      {/* CTA / BOOKING */}
      <section id="book" className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#f47d01]/40 via-[#f47d01]/10 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(244,125,1,0.2)", boxShadow: "0 25px 60px rgba(244,125,1,0.08)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #173346 0%, #1c3a52 50%, #0c1d2b 100%)" }} />
            <div className="absolute inset-0 bg-grid-light opacity-20" style={{ backgroundSize: "48px 48px" }} />
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(244,125,1,0.08)" }} />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(149,201,61,0.05)" }} />
            <div className="relative p-8 lg:p-14 text-center">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] mb-6" style={{ color: "#f47d01" }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#f47d01" }} />
                See It For Yourself
              </div>
              <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-gradient-steel tracking-tight leading-[1.03] max-w-3xl mx-auto">
                Ready to make confident,<br />
                <span className="text-gradient-orange">profitable decisions?</span>
              </h2>
              <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#b7cce4" }}>
                Tighter margins. Rising costs. A market that won&apos;t sit still. 14 years of real bulk freight data, built to help carriers, brokers, and shippers price with confidence and get paid fairly.
              </p>
              <div className="mt-12 grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto text-left">
                {perks.map((p) => (
                  <div key={p.title} className="relative p-5 rounded-xl transition-colors" style={{ background: "rgba(12,29,43,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f47d01", color: "#0c1d2b", boxShadow: "0 4px 12px rgba(244,125,1,0.25)" }}>
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-[15px] leading-snug">{p.title}</div>
                        <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "#8aabd0" }}>{p.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 max-w-sm mx-auto">
                <BookingModal />
                <p className="mt-4 text-xs italic tracking-wide" style={{ color: "rgba(244,125,1,0.8)" }}>Built to help our partners win.</p>
              </div>
              <div className="mt-12 max-w-xl mx-auto">
                <div className="relative p-6 lg:p-7 rounded-2xl overflow-hidden text-left" style={{ background: "linear-gradient(135deg, rgba(12,29,43,0.9) 0%, rgba(23,51,70,0.7) 100%)", border: "1px solid rgba(244,125,1,0.2)" }}>
                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl" style={{ background: "rgba(244,125,1,0.08)" }} />
                  <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="relative flex-shrink-0 self-center sm:self-start">
                      <div className="h-20 w-20 rounded-full overflow-hidden" style={{ outline: "2px solid rgba(244,125,1,0.4)", boxShadow: "0 8px 24px rgba(244,125,1,0.2)" }}>
                        <Image src="/john-calloway.png" alt="John F. Calloway" width={160} height={160} className="h-full w-full object-cover object-top" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2" style={{ background: "#95c93d", borderColor: "#173346" }} />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="text-[9px] uppercase tracking-[0.25em] mb-1.5" style={{ color: "#f47d01" }}>Your Host</div>
                      <div className="font-bold text-white text-lg leading-tight">John F. Calloway</div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(244,125,1,0.9)" }}>Chief Commercial Officer</div>
                      <div className="mt-4 pt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-start" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <a href="tel:+14175226740" className="flex items-center gap-1.5 text-[13px] transition-colors" style={{ color: "#dbe5f1" }}>
                          <Mail className="h-3.5 w-3.5" strokeWidth={2.5} style={{ color: "rgba(244,125,1,0.7)" }} />
                          <span>417.522.6740</span>
                        </a>
                        <a href="mailto:John.c@bulkloads.com" className="flex items-center gap-1.5 text-[13px] transition-colors" style={{ color: "#dbe5f1" }}>
                          <Mail className="h-3.5 w-3.5" strokeWidth={2.5} style={{ color: "rgba(244,125,1,0.7)" }} />
                          <span>John.c@bulkloads.com</span>
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

      {/* FOOTER */}
      <footer className="border-t py-8" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/bulkloads-logo-transparent.png" alt="BulkLoads" width={90} height={22} className="h-6 w-auto" unoptimized />
            <span className="text-xs text-white/25">· Bulk Insights</span>
          </div>
          <p className="text-[11px] text-white/20">© {new Date().getFullYear()} BulkLoads. Market data for bulk freight professionals.</p>
        </div>
      </footer>
    </main>
  );
}
