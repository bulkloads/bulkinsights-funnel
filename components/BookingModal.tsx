"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ArrowUpRight, Calendar, X } from "lucide-react";

type Variant = "default" | "header" | "hero";

export default function BookingModal({ variant = "default" }: { variant?: Variant }) {
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

  const trigger =
    variant === "header" ? (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:-translate-y-px"
        style={{ background: "#f47d01", color: "#0c1d2b", boxShadow: "0 4px 14px rgba(244,125,1,0.35)" }}
      >
        <Calendar className="h-3.5 w-3.5" strokeWidth={2.5} />
        Book a Demo
      </button>
    ) : variant === "hero" ? (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
        style={{ background: "#f47d01", color: "#0c1d2b", boxShadow: "0 8px 24px rgba(244,125,1,0.35)" }}
      >
        <Calendar className="h-4 w-4" strokeWidth={2.5} />
        Schedule a Demo
        <ArrowUpRight className="h-4 w-4" strokeWidth={3} />
      </button>
    ) : (
      <button
        onClick={() => setOpen(true)}
        className="group w-full inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5"
        style={{ background: "#f47d01", color: "#0c1d2b", boxShadow: "0 8px 32px rgba(244,125,1,0.3)" }}
      >
        <Calendar className="h-5 w-5" strokeWidth={2.5} />
        Schedule Your Demo
        <ArrowUpRight
          className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          strokeWidth={3}
        />
      </button>
    );

  return (
    <>
      {trigger}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Book a demo"
        >
          <div
            className="absolute inset-0 backdrop-blur-sm animate-in fade-in"
            style={{ background: "rgba(12,29,43,0.85)" }}
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col"
            style={{ border: "1px solid rgba(244,125,1,0.2)" }}>
            <div className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
              style={{ background: "#0c1d2b", borderColor: "rgba(255,255,255,0.1)" }}>
              <div className="h-9 w-9 rounded-lg flex items-center justify-center"
                style={{ background: "#f47d01" }}>
                <Calendar className="h-4 w-4" strokeWidth={2.5} style={{ color: "#0c1d2b" }} />
              </div>
              <div className="font-bold text-white text-base leading-tight">Book Your Demo</div>
              <div className="ml-auto flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#95c93d" }} />
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "#95c93d" }}>
                    Live Calendar
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors text-white"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

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
