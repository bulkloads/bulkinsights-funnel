"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
 * The funnel's GA4 client_id, read off the `_ga` cookie once GA has written it.
 *
 * Shared at module scope like the attribution above and resolved once per page.
 * Empty until GA's async script sets the cookie — a short poll covers that gap —
 * so the href gains `ga_cid` well before anyone can click. Stays undefined when
 * GA is off (no NEXT_PUBLIC_GA_ID, so no cookie), and nothing is forwarded.
 */
let gaClientIdPromise: Promise<string | undefined> | null = null;

function resolveGaClientId(): Promise<string | undefined> {
  gaClientIdPromise ??= new Promise((resolve) => {
    if (!process.env.NEXT_PUBLIC_GA_ID) return resolve(undefined);
    let tries = 0;
    const read = () => {
      // `_ga` is `GA1.<n>.<client_id>`, GA's client_id being the trailing
      // `<int>.<int>`; matching that shape also validates it before it rides a URL.
      const m = document.cookie.match(/(?:^|;\s*)_ga=GA\d+\.\d+\.(\d+\.\d+)/);
      if (m) return resolve(m[1]);
      if (++tries > 15) return resolve(undefined); // ~3s; GA never wrote a cookie
      setTimeout(read, 200);
    };
    read();
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
    <Link
      href={authUrl(action, { orgType, plan, seats, attribution, gaClientId })}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}
