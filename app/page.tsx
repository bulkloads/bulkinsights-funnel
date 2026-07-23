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
  { icon: Truck, tag: "Rate Intelligence", title: "Rating Tool", description: "Geo-fenced lane rates with equipment-type matching. Get low, average, and high benchmarks with confidence scoring on every estimate.", screenshot: "/screenshot-1.png" },
  { icon: Anchor, tag: "Waterway Markets", title: "Barge Data", description: "Spot vs. 3-month forward curves for every major river terminal. Spot the spread before competitors do.", screenshot: "/screenshot-2.png" },
  { icon: TrendingUp, tag: "Multi-Modal", title: "Grain Transport Cost", description: "Cost per ton by mode — truck, shuttle train, barge, Gulf vessel, Pacific vessel — on a single chart so you always know the most efficient move.", screenshot: "/screenshot-3.png" },
  { icon: BarChart3, tag: "Market Trends", title: "Commodity Trends", description: "Rate trends by commodity group over 3, 6, 9, or 12 months. Know which markets are heating up before the freight moves.", screenshot: "/screenshot-4.png" },
];


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
            {[["14 yrs","of settled freight data"],["33","commodity groups"],["5","equipment types"]].map(([num, label]) => (
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
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Image
                      src={feat.screenshot}
                      alt={feat.title}
                      width={1200}
                      height={750}
                      className="w-full h-auto block"
                      quality={90}
                    />
                  </div>
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
