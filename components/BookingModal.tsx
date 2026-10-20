"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Script from "next/script";
import { ArrowUpRight, Calendar, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackEvent, trackMeta } from "@/lib/analytics";
import { brand } from "@/lib/brand";

declare global {
  interface Window {
    BulkCRMBook?: { mount: () => void };
  }
}

type Variant = "default" | "header" | "hero" | "portalLink";

/**
 * BulkCRM's booking widget, and the calendar it should show.
 *
 * The script derives the iframe's origin from its OWN src, so this URL decides
 * which deployment of BulkCRM the calendar is served from as well as where the
 * script comes from. Moving the calendar to its own domain later is a change
 * to this one line.
 */
const WIDGET_SRC = "https://bulk-crm.vercel.app/widget/book.js";
const CALENDAR = "insights";

export default function BookingModal({
  variant = "default",
  accent = brand.orange,
  label,
}: {
  variant?: Variant;
  /**
   * Modal chrome colour. Defaults to THE BulkLoads orange — see lib/brand,
   * which keeps exactly one.
   *
   * Typed as a hex literal because it is concatenated with an alpha suffix
   * below. `rgb(...)`, `hsl(...)` or a CSS variable would produce an
   * invalid declaration that the browser drops silently, taking the
   * modal's border with it.
   */
  accent?: `#${string}`;
  /** Overrides the trigger copy. */
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  /**
   * Opening the calendar is the one measurable step of the sales route, and
   * the only one this site can see: the booking itself happens inside the
   * embedded scheduler, on another origin, which tells us nothing. So this
   * counts intent to talk to someone, not a booked meeting, and the name says
   * `opened` rather than `booked` so nobody reads it as the latter.
   */
  const openCalendar = () => {
    trackEvent("booking_opened", { page: pathname ?? "unknown", variant });
    // Meta's standard event for a sales enquiry. Someone opening the calendar
    // is the closest thing to a lead this site can actually observe.
    trackMeta("Lead", { content_category: "demo_request" });
    setOpen(true);
  };

  useEffect(() => setMounted(true), []);

  // The widget mounts marked elements as they appear, via its own
  // MutationObserver, which covers this modal arriving in a portal after the
  // script has loaded. This is the belt to that braces: the widget also
  // exposes a manual mount, and calling it on open means a browser without
  // MutationObserver, or an observer that missed the insertion, still gets a
  // calendar rather than an empty white panel.
  useEffect(() => {
    if (!open) return;
    window.BulkCRMBook?.mount();
  }, [open]);

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
    variant === "portalLink" ? (
      <button
        onClick={openCalendar}
        className="font-semibold underline underline-offset-2 transition-colors"
        style={{ color: accent }}
      >
        {label ?? "Book a demo"}
      </button>
    ) : variant === "header" ? (
      <button
        onClick={openCalendar}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:-translate-y-px"
        style={{ background: "#f47d01", color: "#0c1d2b", boxShadow: "0 4px 14px rgba(244,125,1,0.35)" }}
      >
        <Calendar className="h-3.5 w-3.5" strokeWidth={2.5} />
        Book a Demo
      </button>
    ) : variant === "hero" ? (
      <button
        onClick={openCalendar}
        className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
        style={{ background: "#f47d01", color: "#0c1d2b", boxShadow: "0 8px 24px rgba(244,125,1,0.35)" }}
      >
        <Calendar className="h-4 w-4" strokeWidth={2.5} />
        Schedule a Demo
        <ArrowUpRight className="h-4 w-4" strokeWidth={3} />
      </button>
    ) : (
      <button
        onClick={openCalendar}
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

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
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
            style={{ border: `1px solid ${accent}33` }}>
            <div className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
              style={{ background: "#0c1d2b", borderColor: "rgba(255,255,255,0.1)" }}>
              <div className="h-9 w-9 rounded-lg flex items-center justify-center"
                style={{ background: accent }}>
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

            {/* BulkCRM's widget turns this div into the booking iframe and
                keeps its height in step with its content over postMessage, so
                nothing here sets a height: the old embed was pinned at 820px
                and either clipped the calendar or left a band of white under
                it depending on the step. */}
            <div className="flex-1 overflow-y-auto bg-white">
              <div data-bulkcrm-book={CALENDAR} />
            </div>
          </div>

          <Script src={WIDGET_SRC} strategy="afterInteractive" />
        </div>
  );

  return (
    <>
      {trigger}
      {mounted && open && createPortal(modal, document.body)}
    </>
  );
}
