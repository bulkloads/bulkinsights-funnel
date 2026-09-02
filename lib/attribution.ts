/**
 * Campaign attribution picked off the funnel's own query string and forwarded
 * to Insights, so a signup can be credited to the ad or email that produced it.
 *
 * An allow list rather than "every parameter we were given": the value ends up
 * in a URL we construct and hand to another origin, and forwarding arbitrary
 * caller-supplied keys is how a redirect target or a tracking parameter someone
 * else cares about gets smuggled through us.
 */

export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
] as const;

/** Long enough for any real campaign value; short enough to bound the URL. */
const MAX_VALUE_LENGTH = 200;

/** The recognised parameters present in a query string, in catalog order. */
export function pickAttribution(search: string): Record<string, string> {
  const given = new URLSearchParams(search);
  const found: Record<string, string> = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = given.get(key)?.trim();
    if (value) found[key] = value.slice(0, MAX_VALUE_LENGTH);
  }
  return found;
}
