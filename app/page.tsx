import Script from "next/script";
import { Calendar, Check } from "lucide-react";

const perks = [
  "30-minute walkthrough, built around your business",
  "Live data pulled for the lanes you actually work",
  "Honest answers to every question you bring",
  "No pressure, no sales theater — just a real conversation",
];

export default function Page() {
  return (
    <main className="min-h-screen flex items-center">
      <section id="book" className="relative py-20 lg:py-28 overflow-hidden w-full">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-400/40 via-amber-400/10 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-amber-400/20 shadow-2xl shadow-amber-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
            <div className="absolute inset-0 bg-grid-light [background-size:48px_48px] opacity-30" />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />

            <div className="relative grid lg:grid-cols-12 gap-10 p-8 lg:p-14">
              {/* Left: copy */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 mb-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  See It For Yourself
                </div>
                <h2 className="font-display font-bold text-4xl sm:text-5xl text-gradient-steel tracking-tight leading-[1.03]">
                  Ready to make confident,
                  <br />
                  <span className="text-gradient-amber">data-driven decisions?</span>
                </h2>
                <p className="mt-6 text-lg text-navy-200 max-w-xl leading-relaxed">
                  Book a 30-minute demo and we&apos;ll pull up real market data
                  for the lanes, commodities, and carriers that matter to your
                  business. Our goal isn&apos;t to sell you — it&apos;s to show
                  you how Bulk Insights can help you win.
                </p>

                <ul className="mt-8 space-y-3">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-navy-100">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-amber-400 text-navy-950 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm lg:text-base">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-3 text-center max-w-xs">
                  <div>
                    <div className="font-mono text-lg font-bold text-amber-400">30m</div>
                    <div className="text-[10px] text-navy-400 font-mono uppercase tracking-widest">
                      Demo
                    </div>
                  </div>
                  <div className="border-x border-white/5">
                    <div className="font-mono text-lg font-bold text-amber-400">Live</div>
                    <div className="text-[10px] text-navy-400 font-mono uppercase tracking-widest">
                      Data
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-lg font-bold text-amber-400">$0</div>
                    <div className="text-[10px] text-navy-400 font-mono uppercase tracking-widest">
                      Obligation
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-[11px] font-mono text-navy-400 uppercase tracking-widest">
                  Or call · 1-800-518-9240
                </div>
              </div>

              {/* Right: calendar embed */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl bg-white border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 bg-navy-950 border-b border-white/10">
                    <div className="h-9 w-9 rounded-lg bg-amber-400 text-navy-950 flex items-center justify-center">
                      <Calendar className="h-4.5 w-4.5" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-base leading-tight">
                        Book Your Demo
                      </div>
                      <div className="text-[11px] text-navy-300 font-mono">
                        30 min · Zoom · No slides
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                        Live Calendar
                      </span>
                    </div>
                  </div>
                  <iframe
                    src="https://links.bulkloads.com/widget/booking/UzE0ZL169iih4haYPiob"
                    style={{ width: "100%", border: "none", overflow: "hidden" }}
                    scrolling="no"
                    id="UzE0ZL169iih4haYPiob_1775840431013"
                    className="min-h-[720px] w-full"
                    title="Book a Bulk Insights demo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Script
          src="https://links.bulkloads.com/js/form_embed.js"
          strategy="afterInteractive"
        />
      </section>
    </main>
  );
}
