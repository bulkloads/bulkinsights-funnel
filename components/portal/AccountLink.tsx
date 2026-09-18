"use client";

import { useEffect, useState } from "react";
import OffsiteLink from "@/components/portal/OffsiteLink";
import { pickAttribution } from "@/lib/attribution";
import { authUrl, type AuthIntent } from "@/lib/brand";

/**
 * The landing query string's campaign parameters, read once and kept for the
 * rest of the visit.
 *
 * Module scope rather than per-link state because the parameters belong to the
 * *arrival*, not to the page currently on screen. Someone who lands on
 * `/carriers?utm_source=…` and clicks through to `/brokers` has an internal
 * URL with no campaign on it by the time they reach a CTA, and re-reading the
 * location there would forget where they came from.
 */
let landingAttribution: Record<string, string> | null = null;

function useAttribution(): Record<string, string> {
  // Empty for the server render and the first client render, so the markup
  // matches and hydration is quiet; the real value arrives a tick later. The
  // href is correct well before anybody can click it.
  const [attribution, setAttribution] = useState<Record<string, string>>({});

  useEffect(() => {
    landingAttribution ??= pickAttribution(window.location.search);
    if (Object.keys(landingAttribution).length > 0) setAttribution(landingAttribution);
  }, []);

  return attribution;
}

/**
 * The funnel's GA4 client_id, asked of gtag once it is up.
 *
 * Shared at module scope like the attribution above and resolved once per page,
 * so the href gains `ga_cid` well before anyone can click. Stays undefined when
 * GA is off (no NEXT_PUBLIC_GA_ID), and nothing is forwarded.
 *
 * `gtag('get')` rather than reading the `_ga` cookie. Inside the bulkloads.com
 * embed this document is cross-site, and Chrome and Safari hide that cookie
 * from script there — it would never turn up — while gtag still holds the id it
 * is sending hits under, in memory when it cannot persist it. The command queues
 * behind `config` and is answered whenever gtag.js finishes loading, so it needs
 * no deadline; when GA is blocked it is never answered and nothing is forwarded,
 * which is the same outcome the cookie gave.
 *
 * The `gtag` stub that queues the command is written by an inline script that
 * runs after hydration, so it can be missing on the first effect. A short wait
 * covers that gap, and a miss is not remembered: a link mounted later asks again.
 */
let gaClientIdPromise: Promise<string | undefined> | null = null;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

function resolveGaClientId(): Promise<string | undefined> {
  gaClientIdPromise ??= new Promise((resolve) => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return resolve(undefined);
    // Async paths only: inside the executor the `??=` assignment has not
    // happened yet, so clearing here would be overwritten.
    const miss = () => {
      gaClientIdPromise = null;
      resolve(undefined);
    };
    let tries = 0;
    const ask = () => {
      const { gtag } = window as GtagWindow;
      if (gtag) {
        return gtag("get", gaId, "client_id", (id: unknown) => {
          // GA's client_id is `<int>.<int>`; checking the shape also validates
          // it before it rides a URL.
          if (typeof id === "string" && /^\d+\.\d+$/.test(id)) resolve(id);
          else miss();
        });
      }
      if (++tries > 25) return miss(); // ~5s; the init script never ran
      setTimeout(ask, 200);
    };
    ask();
  });
  return gaClientIdPromise;
}

function useGaClientId(): string | undefined {
  const [clientId, setClientId] = useState<string>();

  useEffect(() => {
    let active = true;
    resolveGaClientId().then((id) => {
      if (active && id) setClientId(id);
    });
    return () => {
      active = false;
    };
  }, []);

  return clientId;
}

/**
 * A link to sign-in or sign-up carrying the visitor's intent: the org type the
 * page establishes, the plan they clicked, and how they got here.
 *
 * Client-side because attribution only exists in the browser — this site is
 * statically rendered, so the server never sees the visitor's query string.
 *
 * An OffsiteLink, so that where this site is embedded the click takes the top
 * window: the handoff is cross-origin and ends on a page that refuses to be
 * framed.
 */
export default function AccountLink({
  action,
  orgType,
  plan,
  seats,
  children,
  className,
  style,
}: Omit<AuthIntent, "attribution" | "gaClientId"> & {
  action: "sign-in" | "sign-up";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const attribution = useAttribution();
  const gaClientId = useGaClientId();

  return (
    <OffsiteLink
      href={authUrl(action, { orgType, plan, seats, attribution, gaClientId })}
      className={className}
      style={style}
    >
      {children}
    </OffsiteLink>
  );
}
