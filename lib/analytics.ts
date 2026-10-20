/**
 * Funnel events, sent to whatever analytics this deployment actually has.
 *
 * Two sinks because the site has two, at different stages of being wired up:
 *
 *  - Vercel Analytics is mounted in app/layout.tsx and works today.
 *  - GA4 is configured on Google's side and its measurement id is set in
 *    Vercel, but the tag is not in the codebase yet, so `window.gtag` is
 *    undefined at runtime. The call is guarded rather than omitted: the day
 *    the tag lands, these events start arriving in GA4 with no further
 *    change here.
 *
 * Every call is wrapped. An analytics failure must never be the reason a
 * visitor does not reach sign-up, so a blocked script, an ad blocker or a
 * provider outage has to fall through silently to the navigation.
 */

import { track as vercelTrack } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Record<string, unknown>) => void;
    fbq?: (command: string, name: string, params?: Record<string, unknown>) => void;
  }
}

type Props = Record<string, string | number | boolean>;

export function trackEvent(name: string, props: Props = {}): void {
  try {
    vercelTrack(name, props);
  } catch {
    /* Analytics is never worth breaking a click over. */
  }

  try {
    window.gtag?.("event", name, props);
  } catch {
    /* Same. */
  }
}

/**
 * A Meta standard event.
 *
 * Separate from `trackEvent` rather than a third sink inside it, because the
 * two systems do not take the same vocabulary. GA4 is happy with any snake
 * case name this site invents; Meta optimises ad delivery against a fixed set
 * of standard events, and an invented name is a custom event it cannot
 * optimise for. So the mapping from "what happened" to "what Meta calls it"
 * is made deliberately at each call site instead of by a rule here.
 *
 * Wrapped like the rest: a blocked pixel must never be why somebody fails to
 * reach sign-up.
 */
export function trackMeta(event: string, props: Props = {}): void {
  try {
    window.fbq?.("track", event, props);
  } catch {
    /* Analytics is never worth breaking a click over. */
  }
}
