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
}: Omit<AuthIntent, "attribution"> & {
  action: "sign-in" | "sign-up";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const attribution = useAttribution();

  return (
    <Link
      href={authUrl(action, { orgType, plan, seats, attribution })}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}
