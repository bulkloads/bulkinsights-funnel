/**
 * The self-serve plans, as the funnel advertises them.
 *
 * A hand-kept mirror of `lib/billing/self-serve-catalog.ts` in the Insights
 * repo, which is where these prices are actually defined and from which Stripe
 * is provisioned. Two separate deployments cannot share a module, so this is a
 * copy, and a copy can drift — the mitigation is that nothing here can produce
 * a wrong charge. These figures are a shop window: the plan picker on
 * `/upgrade` re-renders from the real catalog, checkout resolves the live
 * Stripe price server-side, and Stripe shows the amount again before anyone
 * pays. A stale number here is a wrong advert, never a wrong bill.
 *
 * Sourced 2026-09-01 from the Insights `feat/insights-front-door` branch.
 *
 * Prices are per seat per month, in cents, and volume-tiered: crossing a band
 * reprices every seat, not just the ones above the line.
 */

import type { OrgType } from "@/lib/brand";

export type PlanKey =
  | "owner_operator"
  | "pricing_only"
  | "pricing_analytics"
  | "pricing_analytics_procurement";

/** One volume band. `upTo` is an inclusive seat ceiling. */
export type PlanTier = { upTo: number | "inf"; unitAmount: number };

export type Plan = {
  key: PlanKey;
  /** As the plan picker shows it, with the "BulkInsights - " prefix dropped. */
  name: string;
  description: string;
  maxSeats: number;
  /**
   * Owner Operator is not chosen, it is established: Insights checks the
   * federal census (and the fleet class bulkloads-v2 publishes) for a
   * one-truck, one-driver operation and refuses checkout otherwise. Shown here
   * with that condition stated rather than hidden, because a carrier page that
   * omits the cheapest plan in the catalog is its own kind of dishonest.
   */
  eligibility?: string;
  /** One price per org type this plan is sold to. */
  prices: Partial<Record<OrgType, ReadonlyArray<PlanTier>>>;
  /** The plan this one is a superset of. The catalog is strictly nested. */
  buildsOn?: PlanKey;
  /** Feature labels this plan grants, in catalog order. */
  features: ReadonlyArray<string>;
};

/** Checkout caps here; above it is contact-sales. */
export const MAX_SELF_SERVE_SEATS = 6;

/** The seat count a plan card asks for. See `PricingSection`. */
export const DEFAULT_SEATS = 1;

const PRICING_FEATURES = [
  "Rate estimates",
  "Fuel prices",
  "Operating cost",
  "Year over year rates",
] as const;

const ANALYTICS_FEATURES = [
  "Commodity heatmap",
  "Commodity momentum",
  "Commodity trends",
  "Load heatmap",
  "Load volume",
  "Mileage band rates",
  "Regional activity",
  "Year over year overlay",
] as const;

const PROCUREMENT_FEATURES = [
  "Carrier discovery",
  "Request for proposal bidding",
  "Equipment heatmap",
  "Carrier heatmap",
] as const;

export const PLANS: ReadonlyArray<Plan> = [
  {
    key: "owner_operator",
    name: "Owner Operator (Rating Only)",
    description:
      "Rate estimates, fuel prices, and operating cost for a single-truck operation.",
    maxSeats: 1,
    eligibility:
      "For single-truck operations. Eligibility is confirmed against your DOT record before checkout.",
    prices: { carrier: [{ upTo: "inf", unitAmount: 5_000 }] },
    features: PRICING_FEATURES,
  },
  {
    key: "pricing_only",
    name: "Pricing",
    description:
      "Rate estimates, fuel prices, operating cost, and year-over-year rate history.",
    maxSeats: MAX_SELF_SERVE_SEATS,
    prices: {
      carrier: [
        { upTo: 3, unitAmount: 9_900 },
        { upTo: "inf", unitAmount: 8_900 },
      ],
    },
    features: PRICING_FEATURES,
  },
  {
    key: "pricing_analytics",
    name: "Pricing + Analytics",
    description:
      "Everything in Pricing, plus market analytics, commodity and load heatmaps, and volume trends.",
    maxSeats: MAX_SELF_SERVE_SEATS,
    buildsOn: "pricing_only",
    prices: {
      carrier: [
        { upTo: 3, unitAmount: 10_900 },
        { upTo: "inf", unitAmount: 9_900 },
      ],
      broker: [
        { upTo: 3, unitAmount: 15_000 },
        { upTo: "inf", unitAmount: 14_000 },
      ],
      shipper: [
        { upTo: 3, unitAmount: 19_900 },
        { upTo: "inf", unitAmount: 17_900 },
      ],
    },
    features: [...PRICING_FEATURES, ...ANALYTICS_FEATURES],
  },
  {
    key: "pricing_analytics_procurement",
    name: "Pricing + Analytics + Capacity Procurement",
    description:
      "Everything in Pricing and Analytics, plus equipment and carrier heatmaps, carrier discovery, and RFP bidding.",
    maxSeats: MAX_SELF_SERVE_SEATS,
    buildsOn: "pricing_analytics",
    prices: {
      broker: [
        { upTo: 3, unitAmount: 29_900 },
        { upTo: "inf", unitAmount: 27_900 },
      ],
      shipper: [
        { upTo: 3, unitAmount: 39_900 },
        { upTo: "inf", unitAmount: 34_900 },
      ],
    },
    features: [...PRICING_FEATURES, ...ANALYTICS_FEATURES, ...PROCUREMENT_FEATURES],
  },
];

/** The plans sold to one org type, cheapest first. */
export function plansFor(orgType: OrgType): Array<Plan> {
  return PLANS.filter((plan) => plan.prices[orgType] !== undefined);
}

/** What one org type pays for a plan, or null when it is not sold to them. */
export function tiersFor(plan: Plan, orgType: OrgType): ReadonlyArray<PlanTier> | null {
  return plan.prices[orgType] ?? null;
}

/** The opening band's rate: the headline a card shows. */
export function entryRate(tiers: ReadonlyArray<PlanTier>): number | null {
  return tiers[0]?.unitAmount ?? null;
}

/**
 * Where the per-seat rate first drops, and by how much. Null when there is
 * nothing to advertise: a flat price, or a second band that is not cheaper.
 */
export function volumeBreak(tiers: ReadonlyArray<PlanTier>): {
  fromSeats: number;
  savingPerSeatCents: number;
} | null {
  const [opening, next] = tiers;
  if (!opening || !next || opening.upTo === "inf") return null;
  if (next.unitAmount >= opening.unitAmount) return null;
  return {
    fromSeats: opening.upTo + 1,
    savingPerSeatCents: opening.unitAmount - next.unitAmount,
  };
}

/**
 * The bullets for one plan: what it adds over the next cheapest, since the
 * plans are strictly nested.
 *
 * `shown` decides whether the shorthand is honest. Pricing is sold to carriers
 * alone, so on the broker and shipper pages "Everything in Pricing, plus" would
 * point at a plan that is not on the page, leaving rate estimates and fuel
 * prices named nowhere. When the plan a card builds on is absent, the card
 * lists its own features in full instead.
 */
export function highlightsFor(
  plan: Plan,
  shown: ReadonlyArray<PlanKey>,
): { leadIn: string | null; features: ReadonlyArray<string> } {
  const parentKey = plan.buildsOn;
  const parent = parentKey ? PLANS.find((p) => p.key === parentKey) : undefined;
  if (!parent || !parentKey || !shown.includes(parentKey)) {
    return { leadIn: null, features: plan.features };
  }
  const inherited = new Set(parent.features);
  return {
    leadIn: `Everything in ${parent.name}, plus`,
    features: plan.features.filter((f) => !inherited.has(f)),
  };
}

/** Cents as dollars. Every price in the catalog is round; keep it that way. */
export function formatUsdCents(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars)
    ? `$${dollars.toLocaleString("en-US")}`
    : `$${dollars.toFixed(2)}`;
}
