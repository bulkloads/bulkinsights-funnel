import Image from "next/image";
import { Check, Phone, Mail } from "lucide-react";
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

export default function Page() {
  return (
    <main className="min-h-screen flex items-center">
      <section id="book" className="relative py-16 lg:py-24 overflow-hidden w-full">
        <div className="absolute inset-0 bg-navy-950" />
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
                Tighter margins. Rising costs. A market that won&apos;t sit
                still. 14 years of real bulk freight data, built to help
                carriers, brokers, and shippers price with confidence and get
                paid fairly.
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
                        <div className="font-display font-bold text-white text-[15px] leading-snug">
                          {p.title}
                        </div>
                        <p className="mt-1.5 text-[13px] text-navy-300 leading-relaxed">
                          {p.body}
                        </p>
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

              {/* Your Host — John Calloway */}
              <div className="mt-12 max-w-xl mx-auto">
                <div className="relative p-6 lg:p-7 rounded-2xl bg-gradient-to-br from-navy-950/80 to-navy-900/60 border border-amber-400/20 overflow-hidden text-left">
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />

                  <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="relative flex-shrink-0 self-center sm:self-start">
                      <div className="h-20 w-20 rounded-full overflow-hidden ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20">
                        <Image
                          src="/john-calloway.png"
                          alt="John F. Calloway"
                          width={160}
                          height={160}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-400 border-2 border-navy-900" />
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-amber-400 mb-1.5">
                        Your Host
                      </div>
                      <div className="font-display font-bold text-white text-lg leading-tight">
                        John F. Calloway
                      </div>
                      <div className="text-xs text-amber-400/90 font-mono mt-0.5">
                        Growth Architect, Enterprise
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-start">
                        <a
                          href="tel:+14175226740"
                          className="flex items-center gap-1.5 text-[13px] text-navy-100 hover:text-amber-300 transition-colors group"
                        >
                          <Phone
                            className="h-3.5 w-3.5 text-amber-400/70 group-hover:text-amber-400"
                            strokeWidth={2.5}
                          />
                          <span className="font-mono">417.522.6740</span>
                        </a>
                        <a
                          href="mailto:John.c@bulkloads.com"
                          className="flex items-center gap-1.5 text-[13px] text-navy-100 hover:text-amber-300 transition-colors group"
                        >
                          <Mail
                            className="h-3.5 w-3.5 text-amber-400/70 group-hover:text-amber-400"
                            strokeWidth={2.5}
                          />
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
    </main>
  );
}
