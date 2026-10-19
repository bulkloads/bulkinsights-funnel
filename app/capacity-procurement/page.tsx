import type { Metadata } from "next";
import { ArrowRight, Radar, FileSpreadsheet, Grid2x2, Truck } from "lucide-react";
import AccountLink from "@/components/portal/AccountLink";
import HeroDemo from "@/components/portal/HeroDemo";
import {
  ClosingCta,
  Eyebrow,
  SiteFooter,
  SiteHeader,
} from "@/components/portal/shared";
import { brand, type OrgType } from "@/lib/brand";
import { loadPlans } from "@/lib/insights-plans";
import type { AssertRevalidateMatches } from "@/lib/insights-plans";
import {
  DEFAULT_SEATS,
  entryRate,
  formatUsdCents,
  plansFor,
  tiersFor,
} from "@/lib/plans";

export const metadata: Metadata = {
  title: "Capacity Procurement | Bulk Insights",
  description:
    "Find carriers, run an RFP, and see where equipment actually sits. Capacity procurement for bulk freight, priced against 14 years of settled shipments.",
};

/**
 * Same window as the pricing and ICP pages, and for the same reason: the
 * prices are fetched from Insights at build time, so the page has to expire
 * with its data or it advertises a stale number.
 *
 * Written as a literal because Next reads it by static analysis.
 */
export const revalidate = 3600;
type _RevalidateMatchesFetch = AssertRevalidateMatches<typeof revalidate>;

/** The package this whole page sells, and the one its CTAs carry into sign-up. */
const PLAN_KEY = "pricing_analytics_procurement";

/**
 * Who it is sold to, in the order the page presents them.
 *
 * Carriers are absent because the plan has no carrier price: capacity
 * procurement is something brokers and shippers buy, and a carrier arriving
 * here would be shown a product they cannot purchase.
 */
const BUYERS: ReadonlyArray<{ orgType: OrgType; label: string; line: string }> = [
  {
    orgType: "broker",
    label: "Brokers",
    line: "Cover the freight you just won without starting from a blank search.",
  },
  {
    orgType: "shipper",
    label: "Shippers",
    line: "Run a bid you can defend, and know who can actually haul it.",
  },
];

/**
 * The four capabilities the plan adds on top of Pricing and Analytics, in the
 * order someone procuring capacity meets them: find carriers, put the freight
 * out to bid, then read the market you are bidding into.
 *
 * The titles match the feature names in lib/plans.ts deliberately. Someone
 * comparing this page against the plan card should see the same words, not a
 * marketing paraphrase that leaves them wondering whether it is the same
 * thing.
 */
const CAPABILITIES = [
  {
    icon: Radar,
    title: "Carrier discovery",
    body: "Find carriers already running the lane, by equipment type and commodity, from the freight they have actually settled in the BulkLoads network rather than from a directory listing of who says they haul bulk.",
  },
  {
    icon: FileSpreadsheet,
    title: "Request for proposal bidding",
    body: "Put a bid sheet out and score what comes back against the same benchmark you built the targets on. You see which lanes are priced to attract capacity and which will sit unawarded before you award them.",
  },
  {
    icon: Grid2x2,
    title: "Equipment heatmap",
    body: "Where hopper, end dump, walking floor, belt, and pneumatic equipment is concentrated, so a lane that looks thin on paper can be read as a sourcing problem rather than a pricing one.",
  },
  {
    icon: Truck,
    title: "Carrier heatmap",
    body: "Carrier density by region, so you know whether a lane has ten carriers competing for it or two, which is usually the difference between a rate holding and a rate moving.",
  },
] as const;

/**
 * A landing page for capacity procurement: the tour, what the plan does, and
 * the price, with every control carrying the package into sign-up.
 *
 * Deliberately not in the primary nav. The nav sells by WHO you are, and this
 * page sells one capability to two of those audiences, so it belongs on the end
 * of a campaign or an email rather than beside Carriers, Brokers and Shippers.
 */
export default async function Page() {
  const { plans: catalog } = await loadPlans();

  return (
    <div className="portal-scope min-h-screen bg-white" style={{ color: brand.ink }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="relative overflow-hidden" style={{ background: brand.ink }}>
          <div className="shell relative py-16 lg:py-20">
            <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-5">
                <Eyebrow onDark>Capacity procurement</Eyebrow>
                <h1 className="t-display mt-6 text-[2.4rem] text-white sm:text-[3rem] lg:text-[2.9rem] xl:text-[3.5rem]">
                  Find the capacity
                  <br />
                  <span style={{ color: brand.orange }}>before you need it.</span>
                </h1>
                <p className="t-lead mt-6 max-w-[34rem]" style={{ color: brand.textOnDark }}>
                  Covering bulk freight is a sourcing problem as much as a pricing
                  one. See which carriers already run your lane, where their
                  equipment sits, and what the market has settled at, then put it
                  out to bid against a number you can defend.
                </p>

                <div className="mt-9 flex flex-col items-start gap-4">
                  <AccountLink
                    action="sign-up"
                    plan={PLAN_KEY}
                    seats={DEFAULT_SEATS}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-[17px] font-medium tracking-[-0.01em] transition-colors duration-200"
                    style={{
                      background: brand.orange,
                      color: brand.ink,
                      borderRadius: brand.radiusButton,
                    }}
                  >
                    Get Capacity Procurement
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </AccountLink>
                  <p className="text-[14px]" style={{ color: brand.textOnDarkMuted }}>
                    Already a BulkLoads member?{" "}
                    <AccountLink
                      action="sign-in"
                      plan={PLAN_KEY}
                      className="font-medium underline underline-offset-2"
                      style={{ color: brand.orange }}
                    >
                      Sign in
                    </AccountLink>
                  </p>
                </div>
              </div>

              {/* The tour, in the same panel treatment the home hero uses. */}
              <div className="min-w-0 lg:col-span-7 lg:mt-6">
                <div className="bleed-right">
                  <HeroDemo title="Interactive tour of Bulk Insights" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-28" style={{ background: brand.band }}>
          <div className="shell">
            <div className="max-w-2xl">
              <Eyebrow>What it adds</Eyebrow>
              <h2 className="t-h2 mt-6 text-[2.25rem] sm:text-[2.75rem]">
                Sourcing, bidding, and the market behind both
              </h2>
              <p className="t-lead mt-5" style={{ color: brand.textBody }}>
                Capacity Procurement sits on top of Pricing and Analytics, so the
                benchmark you price against and the carriers you source from come
                from the same settled freight.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {CAPABILITIES.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="border bg-white p-7"
                  style={{ borderColor: brand.border, borderRadius: brand.radiusCard }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} style={{ color: brand.text }} />
                  <h3 className="t-h3 mt-4 text-[17px]">{title}</h3>
                  <p className="t-body mt-2 text-[14px]" style={{ color: brand.textBody }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-28">
          <div className="shell">
            <div className="max-w-2xl">
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="t-h2 mt-6 text-[2.25rem] sm:text-[2.75rem]">
                Priced for who you are
              </h2>
              <p className="t-lead mt-5" style={{ color: brand.textBody }}>
                The same plan is sold at a different rate to a broker and to a
                shipper, because the freight each one is sourcing is different.
                Per user, per month.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {BUYERS.map(({ orgType, label, line }) => {
                const plan = plansFor(orgType, catalog).find((p) => p.key === PLAN_KEY);
                const tiers = plan ? tiersFor(plan, orgType) : null;
                const rate = tiers ? entryRate(tiers) : null;

                return (
                  <div
                    key={orgType}
                    className="flex flex-col border bg-white p-7"
                    style={{ borderColor: brand.border, borderRadius: brand.radiusCard }}
                  >
                    <h3 className="t-h3 text-[17px]">{label}</h3>
                    <p className="t-body mt-2 text-[14px]" style={{ color: brand.textBody }}>
                      {line}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1.5">
                      <span className="tabular text-[2.25rem] font-bold leading-none">
                        {rate === null ? "--" : formatUsdCents(rate)}
                      </span>
                      <span className="text-[13px]" style={{ color: brand.textMuted }}>
                        per user each month
                      </span>
                    </div>

                    <AccountLink
                      action="sign-up"
                      orgType={orgType}
                      plan={PLAN_KEY}
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
              })}
            </div>

            <p className="mt-8 text-[13px]" style={{ color: brand.textMuted }}>
              Carriers do not buy capacity procurement; see{" "}
              <a href="/pricing" className="underline underline-offset-2">
                the full pricing page
              </a>{" "}
              for the plans sold to carriers, and for the larger-team rates on
              every plan.
            </p>
          </div>
        </section>

        <ClosingCta
          plan={PLAN_KEY}
          seats={DEFAULT_SEATS}
          title="Stop sourcing blind."
          body="Carrier discovery, RFP bidding, and equipment coverage, built on 14 years of settled bulk freight in the BulkLoads network."
        />
      </main>

      <SiteFooter />
    </div>
  );
}
