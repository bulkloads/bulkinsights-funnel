"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { HERO_PANEL_CAP } from "@/components/portal/mockups";
import { trackEvent } from "@/lib/analytics";
import { brand } from "@/lib/brand";

/**
 * The interactive product tour, embedded where the hero screenshot used to be.
 *
 * `/demo/` rather than the `/share/` URL that gets handed around: the share
 * page is Storylane's own wrapper page, which is what you open in a tab. The
 * embeddable form is the same id under /demo with `embed=inline`, which is
 * exactly what the share page puts in its own iframe.
 */
const DEMO_ORIGIN = "https://demo.storylane.com";
const DEMO_SRC = `${DEMO_ORIGIN}/demo/qo334gt7wy2e?embed=inline`;

/**
 * The demo's shape, taken from the sizing Storylane publishes for this demo:
 * the recorded frame is 47.45% of its width, and the 25px is the demo's own
 * control bar, a fixed height that must not scale with the width.
 */
const FRAME_PERCENT = 47.45;
const CONTROL_BAR_PX = 25;

/**
 * The expanded size. Width is whichever of three limits binds first: most of
 * the viewport width, a ceiling so it does not sprawl on a large monitor, and
 * the width at which the resulting HEIGHT would overflow the viewport. The
 * third is why this is a custom property rather than three separate values:
 * height is derived from width, so the height limit has to be expressed as a
 * width before anything can be laid out.
 */
const EXPANDED_WIDTH = `min(92vw, 1180px, calc((86vh - ${CONTROL_BAR_PX}px) / ${FRAME_PERCENT / 100}))`;

/**
 * The glow, as three alphas of `brand.orange` (243, 126, 33).
 *
 * Written as rgba literals rather than built from the token, because a token
 * is a hex string and there is no colour maths in a plain style object. They
 * are named and kept together so the one orange stays one orange: if the
 * brand colour ever moves, these move with it, and the comment is the
 * reminder that they are the same colour and not three decisions.
 */
const GLOW_EDGE = "rgba(243,126,33,0.70)";
const GLOW_NEAR = "rgba(243,126,33,0.34)";
const GLOW_FAR = "rgba(243,126,33,0.20)";

/**
 * Storylane events noisy enough to drown the useful ones. `step_view` fires on
 * every step of the tour; the milestones and the CTAs are the shape of the
 * funnel, and those are what analytics wants.
 */
const UNTRACKED_EVENTS = new Set(["step_view"]);

type DemoEvent = {
  event?: unknown;
  step?: { index?: unknown };
};

export default function HeroDemo() {
  const [expanded, setExpanded] = useState(false);
  /**
   * Whether the demo has already enlarged itself once.
   *
   * The visitor is allowed to close it, and someone who does has said they
   * want it small. Without this, the next step they take would throw it open
   * again and they would have to close it repeatedly: the automatic enlarge is
   * a one-time offer, not a standing behaviour.
   */
  const hasAutoExpanded = useRef(false);

  const close = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // The origin check is the whole security boundary on a `message`
      // listener: any page in any frame can post to this window, so without it
      // an unrelated frame could script the overlay open.
      if (event.origin !== DEMO_ORIGIN) return;

      const data = event.data as { message?: unknown; payload?: DemoEvent } | null;
      if (!data || data.message !== "storylane-demo-event") return;

      const name = data.payload?.event;
      if (typeof name !== "string") return;

      // Some of Storylane's names already begin with "demo" (demo_engaged_25,
      // demo_completed) and some do not (primary_cta, flow_start). Prefixing
      // unconditionally produced "demo_demo_engaged_25" in the analytics
      // dashboards, so the prefix is only added where it is missing.
      if (!UNTRACKED_EVENTS.has(name)) {
        trackEvent(name.startsWith("demo") ? name : `demo_${name}`);
      }

      // "They started the tour, or moved past its first step." Step index is
      // checked because a `step_view` for step 1 arrives when the demo loads,
      // which is not the visitor doing anything.
      const started =
        name === "primary_cta" ||
        (name === "step_view" && Number(data.payload?.step?.index) > 1);

      if (started && !hasAutoExpanded.current) {
        hasAutoExpanded.current = true;
        setExpanded(true);
        trackEvent("demo_expanded");
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!expanded) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);

    // The page behind must not scroll while the overlay is up: on a trackpad a
    // stray scroll over the backdrop otherwise moves the hero out from under
    // it, and the demo ends up floating over the footer.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus is deliberately left where it is, which is inside the demo.
    //
    // This opens because the visitor just clicked into the tour and is using
    // it. Pulling focus out to a Close button would interrupt the very thing
    // they started, and an earlier version that tried lost the race to the
    // demo's own focus handling anyway. The cost is that Escape below only
    // fires while focus is still on this page's own chrome: key events inside
    // a cross-origin frame never reach us, and nothing on this side can
    // change that. The Close button and the backdrop are the reliable ways
    // out, and the button is in the tab order straight after the frame.

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded, close]);

  return (
    <>
      {expanded && (
        <div
          className="fixed inset-0 z-50 animate-[fadeIn_160ms_ease-out]"
          style={{ background: "rgba(10,10,9,0.82)" }}
          onClick={close}
          aria-hidden="true"
        />
      )}

      <div className={HERO_PANEL_CAP}>
        {/* Percentage padding on a zero-height box: the classic aspect-ratio
            hold, used here rather than `aspect-ratio` because the control bar
            is a fixed pixel addition and `calc()` inside padding handles the
            mix where the property cannot. It also reserves the space before
            the frame loads, so the hero does not shift as the demo arrives,
            and it keeps holding the column open while the demo is enlarged. */}
        <div
          className="relative h-0"
          style={{ paddingBottom: `calc(${FRAME_PERCENT}% + ${CONTROL_BAR_PX}px)` }}
        >
          {/* THE IFRAME IS NEVER RE-PARENTED. Enlarging only changes this
              element's own position and size. Moving an iframe to a different
              parent in the DOM reloads it, which would restart the tour at
              step one the instant the visitor started it: the exact moment
              this feature exists to serve. */}
          <div
            className={
              expanded
                ? "fixed left-1/2 top-1/2 z-[51] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                : "absolute inset-0 overflow-hidden"
            }
            style={{
              borderRadius: brand.radiusCard,
              // A placeholder tone while the third-party frame connects, so
              // the hero reads as a deliberate panel rather than a hole.
              background: "rgba(255,255,255,0.06)",
              // The glow, in three layers against the dark hero: a hairline
              // edge, a tight halo that reads as the edge catching light, and
              // a wide soft falloff that lifts the panel off the video behind
              // it.
              //
              // Every layer is the one brand orange at low alpha, never a
              // lightened or shifted second orange. Decoration carrying no
              // information, so it is exempt from the 3:1 non-text rule and
              // free to sit this low: nothing here is the only thing marking a
              // boundary, and the panel is legible with it stripped out.
              boxShadow: [
                `0 0 0 1.5px ${GLOW_EDGE}`,
                `0 0 22px ${GLOW_NEAR}`,
                `0 0 72px ${GLOW_FAR}`,
              ].join(", "),
              ...(expanded
                ? {
                    width: EXPANDED_WIDTH,
                    height: `calc(${EXPANDED_WIDTH} * ${FRAME_PERCENT / 100} + ${CONTROL_BAR_PX}px)`,
                  }
                : null),
            }}
            // `role="dialog"` without `aria-modal`: the overlay is a dialog,
            // but aria-modal would promise assistive technology that focus is
            // held inside it and the rest of the page is inert, and this one
            // traps nothing. Claiming it would be worse than not saying it.
            role={expanded ? "dialog" : undefined}
            aria-label={expanded ? "Bulk Insights product tour" : undefined}
          >
            <iframe
              src={DEMO_SRC}
              title="Interactive tour of the Bulk Insights rating tool"
              allow="fullscreen"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
            />
          </div>

          {expanded && (
            <button
              type="button"
              onClick={close}
              className="fixed right-5 top-5 z-[52] inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium transition-colors duration-200 hover:bg-white/10"
              style={{
                color: brand.white,
                border: `1px solid ${brand.borderOnDark}`,
                borderRadius: brand.radiusButton,
              }}
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
              Close
            </button>
          )}
        </div>
      </div>
    </>
  );
}
