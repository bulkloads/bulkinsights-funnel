import type { Metadata } from "next";
import PricingSection from "@/components/portal/PricingSection";
import {
  ClosingCta,
  Eyebrow,
  SiteFooter,
  SiteHeader,
} from "@/components/portal/shared";
import { brand } from "@/lib/brand";
import type { AssertRevalidateMatches } from "@/lib/insights-plans";

export const metadata: Metadata = {
  title: "Pricing | Bulk Insights",
  description:
    "Self-serve plans for carriers, brokers and shippers. Per user, per month, with every seat repriced as the team grows.",
};

/**
 * Same window as the ICP pages, and for the same reason: the prices are
 * fetched from Insights at build time, so the page has to expire with its
 * data or it advertises a stale number. See the note in app/shippers/page.tsx.
 *
 * Written as a literal because Next reads it by static analysis.
 */
export const revalidate = 3600;
type _RevalidateMatchesFetch = AssertRevalidateMatches<typeof revalidate>;

/**
 * The whole catalog on one page.
 *
 * The same plan is sold at a different rate to a carrier, a broker and a
 * shipper, so there is no single table to show: this stacks the three, each
 * rendered by the very component the ICP pages use. That is deliberate rather
 * than lazy. The cards carry their package key into sign-up the same way, so a
 * plan clicked here opens the picker on that plan exactly as it does from
 * /carriers, and the two can never drift apart because there is only one card.
 *
 * The seat-ceiling footnote is left to the last block; repeating it under all
 * three would say the same sentence three times.
 */
export default function Page() {
  return (
    <div className="portal-scope min-h-screen bg-white" style={{ color: brand.ink }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="relative isolate" style={{ background: brand.ink }}>
          <div className="shell py-20 lg:py-24">
            <div className="max-w-3xl">
              <Eyebrow onDark>Pricing</Eyebrow>
              <h1 className="t-display mt-6 text-[2.6rem] text-white sm:text-[3.5rem] lg:text-[4rem]">
                Priced for how you
                <br />
                <span style={{ color: brand.orange }}>actually use it.</span>
              </h1>
              <p className="t-lead mt-6 max-w-[38rem]" style={{ color: brand.textOnDark }}>
                Every plan is per user, per month. Rates differ by whether you
                haul, broker or ship, because the data each one leans on is
                different. Add people as you need them and a larger team moves
                every seat onto a lower rate.
              </p>
            </div>
          </div>
        </section>

        <PricingSection
          orgType="carrier"
          eyebrow={null}
          heading="For carriers"
          intro={null}
          background={brand.band}
          footnote={false}
        />

        <PricingSection
          orgType="broker"
          eyebrow={null}
          heading="For brokers"
          intro={null}
          background={brand.white}
          footnote={false}
        />

        <PricingSection
          orgType="shipper"
          eyebrow={null}
          heading="For shippers"
          intro={null}
          background={brand.band}
        />

        <ClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
