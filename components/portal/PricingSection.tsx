import { Check } from "lucide-react";
import AccountLink from "@/components/portal/AccountLink";
import { Eyebrow } from "@/components/portal/shared";
import { brand, type OrgType } from "@/lib/brand";
import { loadPlans } from "@/lib/insights-plans";
import {
  DEFAULT_SEATS,
  entryRate,
  formatUsdCents,
  highlightsFor,
  plansFor,
  tiersFor,
  volumeBreak,
  type Plan,
} from "@/lib/plans";

/**
 * Plans, priced for the org type whose page this is.
 *
 * A plan is sold at a different rate to a carrier, a broker and a shipper, so
 * there is no single price to put on a shared pricing page — which is why this
 * lives on each ICP page rather than at `/pricing`. Each card carries its own
 * package key through sign-up, so the plan picker on `/upgrade` opens on the
 * one that was clicked instead of asking again.
 *
 * The figures come from Insights (`lib/insights-plans.ts`), fetched while this
 * page is prerendered and refreshed by the ICP page's `revalidate`; they fall
 * back to the static mirror in `lib/plans.ts` when it cannot be reached at
 * build time. Async for that reason and no other: it is a server component, so
 * the await happens during prerender and the rendered markup is the same
 * either way.
 */
export default async function PricingSection({ orgType }: { orgType: OrgType }) {
  const { plans: catalog, maxSeats } = await loadPlans();
  const plans = plansFor(orgType, catalog);
  const shown = plans.map((p) => p.key);

  return (
    <section className="py-24 lg:py-28" style={{ background: brand.band }}>
      <div className="shell">
        <div className="max-w-2xl">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="t-h2 mt-6 text-[2.25rem] sm:text-[2.75rem] lg:text-[3.2rem]">
            Priced for how you use it
          </h2>
          <p className="t-lead mt-5" style={{ color: brand.textBody }}>
            Per user, per month. Add people as you need them, and a larger team
            moves every seat onto a lower rate.
          </p>
        </div>

        <div
          className={`mt-12 grid gap-5 ${
            plans.length >= 3 ? "lg:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {plans.map((plan) => (
            <PlanCard
              key={plan.key}
              plan={plan}
              orgType={orgType}
              shown={shown}
              catalog={catalog}
            />
          ))}
        </div>

        <p className="mt-8 text-[13px]" style={{ color: brand.textMuted }}>
          Prices in USD, billed monthly. Self-serve covers up to{" "}
          {maxSeats} users; for a larger team call{" "}
          <a href="tel:18005189240" className="underline underline-offset-2">
            1-800-518-9240
          </a>{" "}
          and we will put together a plan that fits.
        </p>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  orgType,
  shown,
  catalog,
}: {
  plan: Plan;
  orgType: OrgType;
  shown: ReadonlyArray<Plan["key"]>;
  /** Every plan on this build, so a card can resolve the one it builds on. */
  catalog: ReadonlyArray<Plan>;
}) {
  const tiers = tiersFor(plan, orgType);
  // Belt and braces: `plansFor` already filtered to plans this org type buys.
  if (!tiers) return null;

  const rate = entryRate(tiers);
  const discount = volumeBreak(tiers, plan.maxSeats);
  const { leadIn, features } = highlightsFor(plan, shown, catalog);

  return (
    <div
      className="flex flex-col border bg-white p-7"
      style={{ borderColor: brand.border, borderRadius: brand.radiusCard }}
    >
      <h3 className="t-h3 text-[17px]">{plan.name}</h3>
      <p className="t-body mt-2 text-[14px]" style={{ color: brand.textBody }}>
        {plan.description}
      </p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="tabular text-[2.25rem] font-bold leading-none">
          {rate === null ? "--" : formatUsdCents(rate)}
        </span>
        <span className="text-[13px]" style={{ color: brand.textMuted }}>
          per user each month
        </span>
      </div>

      {/* Rendered whether or not there is a discount: a grid row is as tall as
          its tallest cell, so an appearing line would shunt every sibling. */}
      <p className="mt-2 min-h-[18px] text-[13px]" style={{ color: brand.textMuted }}>
        {discount
          ? `${formatUsdCents(discount.savingPerSeatCents)} less per user at ${discount.fromSeats} or more`
          : plan.maxSeats === 1
          ? "Single user only"
          : " "}
      </p>

      {plan.eligibility && (
        <p
          className="mt-4 border-l-2 pl-3 text-[13px]"
          style={{ borderColor: brand.orange, color: brand.textBody }}
        >
          {plan.eligibility}
        </p>
      )}

      <div className="mt-6 flex-1 border-t pt-5" style={{ borderColor: brand.border }}>
        {leadIn && (
          <p className="text-[13px] font-medium" style={{ color: brand.textBody }}>
            {leadIn}
          </p>
        )}
        <ul className={leadIn ? "mt-3 space-y-2" : "space-y-2"}>
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                className="mt-[3px] h-3.5 w-3.5 flex-shrink-0"
                strokeWidth={3}
                style={{ color: brand.text }}
              />
              <span className="text-[14px]" style={{ color: brand.textBody }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <AccountLink
        action="sign-up"
        orgType={orgType}
        plan={plan.key}
        seats={DEFAULT_SEATS}
        className="mt-7 inline-flex w-full items-center justify-center px-5 py-3 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200"
        style={{
          background: brand.orange,
          color: brand.ink,
          borderRadius: brand.radiusButton,
        }}
      >
        Get started
      </AccountLink>
    </div>
  );
}
