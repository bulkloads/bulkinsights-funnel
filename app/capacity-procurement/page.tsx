import type { Metadata } from "next";
import { Radar, FileSpreadsheet, Grid2x2, Truck } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import HeroDemo, { CORRIDOR_CARRIERS_TOUR } from "@/components/portal/HeroDemo";
import {
  ClosingCta,
  CtaPair,
  Eyebrow,
  SiteFooter,
  SiteHeader,
} from "@/components/portal/shared";
import { brand } from "@/lib/brand";
import { DEFAULT_SEATS } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Capacity Procurement | Bulk Insights",
  description:
    "Find carriers, run an RFP, and see where equipment actually sits. Capacity procurement for bulk freight, priced against 14 years of settled shipments.",
};

/** The package this whole page sells, and the one its CTAs carry into sign-up. */
const PLAN_KEY = "pricing_analytics_procurement";

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
 * A landing page for capacity procurement: the tour and what the plan does,
 * with every control carrying the package into sign-up.
 *
 * No prices. The page sells the capability and hands the visitor to sign-up or
 * to sales, and the plan is sold at a different rate to a broker than to a
 * shipper, so a single figure here would be wrong for one of them and the pair
 * of figures was a pricing table on a page that is not the pricing page.
 *
 * Deliberately not in the primary nav. The nav sells by WHO you are, and this
 * page sells one capability to two of those audiences, so it belongs on the end
 * of a campaign or an email rather than beside Carriers, Brokers and Shippers.
 */
export default function Page() {
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

                {/* The standard pair, carrying the package so sign-up lands
                    on this plan rather than asking again, and a third door for
                    someone who would rather talk to a person than start an
                    account. */}
                <div className="mt-9">
                  <CtaPair onDark plan={PLAN_KEY} seats={DEFAULT_SEATS} />
                  <p className="mt-6 text-sm" style={{ color: brand.textOnDarkMuted }}>
                    Buying for a team, or want it walked through first?{" "}
                    <span className="inline-block align-middle">
                      <BookingModal variant="portalLink" label="Talk to sales" />
                    </span>
                  </p>
                </div>
              </div>

              {/* The Corridor Carriers tour, in the same panel treatment the
                  home hero uses. A page selling capacity procurement shows the
                  procurement product; the home page's rating tour would be
                  demonstrating something this page does not sell. */}
              <div className="min-w-0 lg:col-span-7 lg:mt-6">
                <div className="bleed-right">
                  <HeroDemo tour={CORRIDOR_CARRIERS_TOUR} />
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
                from the same settled freight. It is sold to brokers and
                shippers; carriers are priced on the plans at{" "}
                <a href="/pricing" className="underline underline-offset-2">
                  our pricing page
                </a>
                .
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
