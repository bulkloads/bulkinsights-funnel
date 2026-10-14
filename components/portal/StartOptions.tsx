"use client";

import { ArrowRight } from "lucide-react";
import OffsiteLink from "@/components/portal/OffsiteLink";
import { useLandingAttribution } from "@/components/portal/useLandingAttribution";
import { trackEvent } from "@/lib/analytics";
import { brand } from "@/lib/brand";

/**
 * Insights' own sign-up and sign-in pages, written out rather than taken from
 * `authUrl()`.
 *
 * `authUrl()` builds the WorkOS handoff at `/api/auth/*`, which is the right
 * target for a control on an ICP page: it carries the visitor's org type and
 * the plan they clicked into the app. This page knows neither. It is a bare
 * destination for the demo's closing CTA to point at, so it sends people to
 * the two pages themselves and lets Insights run its own flow from there.
 *
 * If Insights ever moves them, this is the one place to change.
 */
const SIGN_UP = "https://insights.bulkloads.com/sign-up";
const SIGN_IN = "https://insights.bulkloads.com/sign-in";

/**
 * Campaign parameters pasted onto the destination.
 *
 * Built with `URL` rather than string concatenation because both constants
 * above are bare paths with no query of their own today, and the day one of
 * them gains a `?something` a hand-rolled `+ "?" +` would quietly produce a
 * second question mark and drop the campaign.
 *
 * GA's client_id is deliberately NOT pasted on here the way AccountLink does
 * it. There, `ga_cid` rides inside the `next` parameter, which is the only
 * channel the WorkOS handoff forwards and which Insights reads on `/upgrade`.
 * These two links are ordinary pages rather than that handoff, so a `ga_cid`
 * hung on them has nothing reading it. Session continuity across the domain
 * boundary comes instead from GA's own linker, which decorates outbound links
 * with `_gl` once insights.bulkloads.com is listed under Configure domains.
 */
function withAttribution(href: string, attribution: Record<string, string>): string {
  if (Object.keys(attribution).length === 0) return href;
  const url = new URL(href);
  for (const [key, value] of Object.entries(attribution)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

/**
 * The two routes into Insights, and the measurement of which one people take.
 *
 * Client-side for two reasons that both only exist in the browser: the
 * campaign parameters, which a statically rendered server never sees, and the
 * click event. Split out of the page so the page itself stays a server
 * component and keeps its metadata.
 */
export default function StartOptions() {
  const attribution = useLandingAttribution();

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <OptionCard
        href={withAttribution(SIGN_UP, attribution)}
        choice="sign_up"
        label="New to BulkLoads"
        title="Create an account"
        body="Set up a BulkLoads account and start on Insights straight away."
        cta="Sign up"
        primary
      />
      <OptionCard
        href={withAttribution(SIGN_IN, attribution)}
        choice="sign_in"
        label="Already a member"
        title="Use your BulkLoads login"
        body="Same email and password you use on BulkLoads.com. No second account."
        cta="Sign in"
      />
    </div>
  );
}

/**
 * One of the two routes in, built on the same shape as the plan cards: white
 * on the band, hairline border, control pinned to the bottom edge.
 *
 * The whole card is the link, so the target is the card and not just the few
 * words at the bottom of it. The visible control inside is a `<span>` for that
 * reason: a button or an anchor nested in an anchor is invalid, and screen
 * readers would announce two things to click for one destination.
 *
 * An OffsiteLink, like every other control that leaves this site. BulkLoads
 * embeds this site in an iframe at www.bulkloads.com/bulk-insights/, and
 * without `target="_top"` these two links would try to open Insights inside
 * that frame, where it refuses to render.
 *
 * The secondary card's control is an outline rather than a second orange fill.
 * Orange as type on white is 2.69:1 and fails, so a "quieter orange" is not
 * available here; the pair is distinguished by fill against outline instead,
 * which is the same distinction the rest of the site draws.
 */
function OptionCard({
  href,
  choice,
  label,
  title,
  body,
  cta,
  primary = false,
}: {
  href: string;
  /** Which fork this card is, as it appears in the analytics event. */
  choice: "sign_up" | "sign_in";
  label: string;
  title: string;
  body: string;
  cta: string;
  primary?: boolean;
}) {
  return (
    <OffsiteLink
      href={href}
      // Fire and navigate, rather than preventing the default and navigating
      // after the beacon resolves. Both providers send these over
      // `sendBeacon`, which survives the page going away, so holding the
      // visitor here to wait for an analytics round trip would buy nothing and
      // cost them a delay on the one click that matters.
      onClick={() => trackEvent("start_page_choice", { choice })}
      className="group flex flex-col border bg-white p-7 transition-colors duration-200 hover:bg-black/[0.015]"
      style={{
        // The primary card is marked by a heavier border in the brand colour
        // rather than a tint, so the two sit at the same visual weight as the
        // plan cards they appear a scroll away from.
        borderColor: primary ? brand.orange : brand.border,
        borderRadius: brand.radiusCard,
      }}
    >
      <div className="t-eyebrow" style={{ color: brand.textMuted }}>
        {label}
      </div>
      <h2 className="t-h3 mt-4 text-[1.35rem]">{title}</h2>
      <p className="t-body mt-3 mb-7 text-[14.5px]" style={{ color: brand.textBody }}>
        {body}
      </p>

      {/* Pushed to the bottom so both cards' controls line up even when the
          two bodies wrap to different heights. */}
      <span
        className={`mt-auto inline-flex items-center justify-center gap-2 self-start px-5 py-[12.8px] text-[15.2px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
          primary ? "" : "border group-hover:bg-black/[0.04]"
        }`}
        style={{
          background: primary ? brand.orange : undefined,
          color: primary ? brand.ink : brand.text,
          borderColor: primary ? undefined : brand.border,
          borderRadius: brand.radiusButton,
        }}
      >
        {cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      </span>
    </OffsiteLink>
  );
}
