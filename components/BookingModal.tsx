"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ArrowUpRight, Calendar, X } from "lucide-react";

export default function BookingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group w-full inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl bg-amber-400 text-navy-950 font-bold text-base hover:bg-amber-300 transition-all shadow-xl shadow-amber-500/30 hover:shadow-amber-400/50 hover:-translate-y-0.5"
      >
        <Calendar className="h-5 w-5" strokeWidth={2.5} />
        Schedule Your Demo
        <ArrowUpRight
          className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          strokeWidth={3}
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Book a demo"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm animate-in fade-in"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden border border-amber-400/20 shadow-2xl shadow-amber-500/10 bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-navy-950 border-b border-white/10 flex-shrink-0">
              <div className="h-9 w-9 rounded-lg bg-amber-400 text-navy-950 flex items-center justify-center">
                <Calendar className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base leading-tight">
                  Book Your Demo
                </div>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                    Live Calendar
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="flex-1 overflow-y-auto bg-white">
              <iframe
                src="https://links.bulkloads.com/widget/booking/UzE0ZL169iih4haYPiob"
                style={{ width: "100%", border: "none" }}
                scrolling="yes"
                id="UzE0ZL169iih4haYPiob_1775840431013"
                className="w-full h-[820px]"
                title="Book a Bulk Insights demo"
              />
            </div>
          </div>

          <Script
            src="https://links.bulkloads.com/js/form_embed.js"
            strategy="afterInteractive"
          />
        </div>
      )}
    </>
  );
}
