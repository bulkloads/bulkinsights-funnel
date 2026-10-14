"use client";

import { useEffect, useState } from "react";
import { pickAttribution } from "@/lib/attribution";

/**
 * The landing query string's campaign parameters, read once and kept for the
 * rest of the visit.
 *
 * Module scope rather than per-link state because the parameters belong to the
 * *arrival*, not to the page currently on screen. Someone who lands on
 * `/?utm_source=…`, watches the hero demo and clicks through to `/start` has
 * an internal URL with no campaign on it by the time they reach a CTA, and
 * re-reading the location there would forget where they came from.
 *
 * This lives in its own module, imported by every control that hands off to
 * Insights, so there is exactly one capture for the visit. It used to sit
 * inside AccountLink; once `/start` needed the same value, two modules each
 * holding their own copy would have been two different answers to "where did
 * this person come from", decided by which link happened to mount first.
 */
let landingAttribution: Record<string, string> | null = null;

export function useLandingAttribution(): Record<string, string> {
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
