import type { Metadata } from "next";
import StartOptions from "@/components/portal/StartOptions";
import { Eyebrow, SiteFooter, SiteHeader } from "@/components/portal/shared";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Get started | Bulk Insights",
  description:
    "Two ways in: sign in with your existing BulkLoads account, or create one and get set up with Bulk Insights.",
};

/**
 * The landing page the demo sends people to: the fork between "I already have
 * a BulkLoads account" and "I don't".
 *
 * Built on the same chrome as every other page, so someone arriving from the
 * demo is plainly still on the same site, but deliberately shorter than them.
 * This is the end of a funnel, not the top of one. Anyone who gets here has
 * already watched the demo and been sold, so a second pitch, a closing CTA and
 * a scroll between them and the two buttons would all be arguing a case that
 * is already won. One screen, one decision.
 */
export default function Page() {
  return (
    <div className="portal-scope min-h-screen bg-white" style={{ color: brand.ink }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section style={{ background: brand.ink }}>
          <div className="shell py-16 lg:py-20">
            <div className="max-w-2xl">
              <Eyebrow onDark>Get started</Eyebrow>
              <h1 className="t-display mt-6 text-[2.2rem] text-white sm:text-[2.9rem]">
                Price your next load with{" "}
                <span style={{ color: brand.orange }}>14 years of settled freight.</span>
              </h1>
              <p className="t-lead mt-5 max-w-[34rem]" style={{ color: brand.textOnDark }}>
                Insights opens with your BulkLoads account, so there is no second
                login to keep track of and nothing to install.
              </p>
            </div>
          </div>
        </section>

        {/* The cards carry their own headings, so this band has none of its
            own: a "Which one are you?" above two cards that already say
            "New to BulkLoads" and "Already a member" is a third telling of
            the same thing. */}
        <section className="py-14 lg:py-16" style={{ background: brand.band }}>
          <div className="shell">
            <StartOptions />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
