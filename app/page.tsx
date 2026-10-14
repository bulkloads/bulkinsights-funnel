import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Photo from "@/components/portal/Photo";
import AccountLink from "@/components/portal/AccountLink";
import HeroDemo from "@/components/portal/HeroDemo";
import HeroMedia from "@/components/portal/HeroMedia";
import MarketTicker from "@/components/portal/MarketTicker";
import {
  ClosingCta,
  SignUpButton,
  Eyebrow,
  SignInButton,
  SiteFooter,
  SiteHeader,
} from "@/components/portal/shared";
import { CommodityMockup } from "@/components/portal/mockups";
import { brand } from "@/lib/brand";
import { icpList } from "@/lib/icp";

/* ──────────────────────────────────────────────────────────────
   Content
   ────────────────────────────────────────────────────────────── */

const stats = [
  { figure: "14", unit: "years", label: "of settled freight" },
  { figure: "33", unit: "commodities", label: "dry and liquid bulk" },
  { figure: "5", unit: "equipment types", label: "priced separately" },
];

/* Set as an editorial index rather than a grid of icon cards. */
const capabilities = [
  {
    n: "01",
    title: "Lane rate benchmarks",
    body: "Geo-fenced origin-to-destination rates matched to your equipment type, with low, average, and high estimates per mile and per load.",
  },
  {
    n: "02",
    title: "Confidence scoring",
    body: "Every estimate is scored on how closely the underlying freight matches your lane, so a thin lane never looks like a thick one.",
  },
  {
    n: "03",
    title: "Commodity trends",
    body: "Rate movement by commodity group over 3, 6, 9, or 12 months. See which markets are firming before the freight moves.",
  },
  {
    n: "04",
    title: "Fuel-adjusted cost per mile",
    body: "Rates carry fuel adjustment and cost-per-mile so the number you quote reflects your real margin, not a gross figure.",
  },
  {
    n: "05",
    title: "Regional load volume",
    body: "Where freight is concentrating across the BulkLoads network, so you can position equipment ahead of the market.",
  },
  {
    n: "06",
    title: "Coverage where it counts",
    body: "Hopper, end dump, walking floor, belt, and pneumatic, covering the dry and liquid bulk commodities that actually move.",
  },
  {
    n: "07",
    title: "RFP and bid support",
    body: "Price a full bid sheet against settled freight rather than the long tail of guesswork. Shippers set realistic targets before a bid goes out; brokers see which lines they would be winning underpriced.",
  },
];

/* ──────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────── */

export default function PortalPage() {
  return (
    <div className="portal-scope min-h-screen bg-white" style={{ color: brand.ink }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        {/* ── HERO ────────────────────────────────────────────
            5/7 split, with the larger half going to the demo. It
            was 7/5 when the panel held a still screenshot and 6/6
            when the tour first went in; the tour has a whole app UI
            inside it, and Storylane picks its layout from the frame
            width it sees ON LOAD, so the panel's width is not only a
            composition choice, it decides how cramped the demo
            renders.
            The panel is still offset and bled past the container
            edge rather than sitting in a centred, symmetrical
            frame, which is what keeps the split from reading as a
            plain two-up. */}
        {/* No `isolate` here, and the background sits at z-0 with the content
            above it rather than the background at -z-10.

            `isolate` creates a stacking context, and everything inside one is
            trapped in it: the demo's enlarged overlay could not rise above the
            sticky header, which is a z-40 sibling of this whole section, no
            matter what z-index it asked for. Ordering the two layers
            explicitly inside the section gets the same result and leaves the
            overlay free to stack against the page.

            The content layers carry `relative` with NO z-index on purpose. A
            positioned element with an explicit z-index starts a stacking
            context of its own, which would trap the overlay just as `isolate`
            did; `z-auto` does not, and positioned siblings paint in DOM order
            anyway, so the content still sits above the z-0 background. */}
        <section className="relative overflow-hidden" style={{ background: brand.ink }}>
          <div className="absolute inset-0 z-0">
            <HeroMedia
              slot="homeHero"
              priority
              scrim={"linear-gradient(90deg, rgba(19,19,18,0.94) 0%, rgba(19,19,18,0.86) 45%, rgba(19,19,18,0.62) 100%)"}
            />
          </div>

          <div className="shell relative">
            <div className="grid items-center gap-x-12 gap-y-14 pb-20 pt-16 lg:grid-cols-12 lg:pb-24 lg:pt-20">
              <div className="min-w-0 lg:col-span-5">
                <Eyebrow onDark>Bulk Insights</Eyebrow>

                {/* The lg step is smaller than the xl one because the copy column
                    is 5 of 12 from `lg` up: at 1024 the old 4rem broke this
                    headline across six lines. Full size returns at xl, where
                    the column is wide enough to carry it in four. */}
                <h1 className="t-display mt-6 text-[2.6rem] text-white sm:text-[3.5rem] lg:text-[3.2rem] xl:text-[4rem]">
                  The market intelligence
                  <br />
                  <span style={{ color: brand.orange }}>bulk freight deserves.</span>
                </h1>

                <p className="t-lead mt-6 max-w-[34rem]" style={{ color: brand.textOnDark }}>
                  Rate benchmarks and commodity trends built from 14 years of real settled bulk
                  freight. Fuel-adjusted, confidence-scored, and matched to the lanes you actually
                  run.
                </p>

                <div className="mt-9">
                  <div className="flex flex-col items-start gap-4">
                    <SignUpButton size="xl" filled />
                    <p className="text-[14px]" style={{ color: brand.textOnDarkMuted }}>
                      Already a BulkLoads member?{" "}
                      <AccountLink
                        action="sign-in"
                        className="font-medium underline underline-offset-2"
                        style={{ color: brand.orange }}
                      >
                        Sign in
                      </AccountLink>
                    </p>
                  </div>
                </div>
              </div>

              {/* Offset downward and bled past the container edge, where the
                  product screenshot used to sit. The panel keeps the same
                  width ceiling it had then (HERO_PANEL_CAP in mockups.tsx);
                  only its height changes, because the recording is a wider,
                  shorter frame than the screenshot was. */}
              {/* `mt`, not `translate-y`. A transform makes an element the
                  containing block for every `position: fixed` descendant, so
                  with `translate-y-6` here the demo's enlarged overlay and its
                  backdrop were laid out against THIS column instead of the
                  viewport, and the section's `overflow-hidden` then clipped
                  them. A margin moves the panel the same 24px and creates no
                  containing block. */}
              <div className="min-w-0 lg:col-span-7 lg:mt-6">
                <div className="bleed-right">
                  <HeroDemo />
                </div>
              </div>
            </div>
          </div>

          {/* Stat strip: hairline-divided figures, not centred cards. */}
          <div className="relative border-t" style={{ borderColor: "rgba(255,255,255,0.16)" }}>
            <div className="shell">
              <dl className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"
                style={{ borderColor: "rgba(255,255,255,0.16)" }}>
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`py-6 ${i > 0 ? "sm:pl-8" : ""} ${i < stats.length - 1 ? "sm:pr-8" : ""}`}
                    style={{ borderColor: "rgba(255,255,255,0.16)" }}
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span
                        className="tabular text-[2rem] font-bold leading-none"
                        style={{ color: brand.orange }}
                      >
                        {s.figure}
                      </span>
                      <span className="ml-2 text-sm font-medium" style={{ color: brand.textOnDark }}>
                        {s.unit}
                      </span>
                      <div className="mt-1.5 text-[13px]" style={{ color: brand.textOnDarkMuted }}>
                        {s.label}
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── MARKET TICKER ──────────────────────────────────── */}
        <MarketTicker />

        {/* ── WHAT'S INSIDE ──────────────────────────────────── */}
        <section className="bg-white py-24 lg:py-28">
          <div className="shell">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-5">
                <Eyebrow>What&apos;s inside</Eyebrow>
                <h2 className="t-h2 mt-6 text-[2.25rem] sm:text-[3rem] lg:text-[3.6rem]">
                  Built specifically for bulk freight
                </h2>
                <p className="t-lead mt-5" style={{ color: brand.textBody }}>
                  General freight tools average bulk into the noise. Every number here comes from
                  bulk commodities moving on bulk equipment.
                </p>
              </div>

              {/* Editorial index: hairline rules and numerals carry the
                  structure instead of six identical icon tiles. */}
              <ol className="lg:col-span-7 lg:pt-2">
                {capabilities.map((c, i) => (
                  <li
                    key={c.n}
                    className={`grid grid-cols-[auto_1fr] gap-x-6 border-t py-6 ${
                      i === capabilities.length - 1 ? "border-b" : ""
                    }`}
                    style={{ borderColor: brand.border }}
                  >
                    <span className="t-index pt-0.5 text-sm" style={{ color: brand.textMuted }}>
                      {c.n}
                    </span>
                    <div>
                      <h3 className="t-h3 text-[17px]">{c.title}</h3>
                      <p className="t-body mt-1.5 text-[15px]" style={{ color: brand.textBody }}>
                        {c.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── TRENDS SPOTLIGHT ───────────────────────────────── */}
        <section className="py-24 lg:py-28" style={{ background: brand.offWhite }}>
          <div className="shell">
            <div className="grid items-center gap-x-14 gap-y-12 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-5">
                <Eyebrow>Market trends</Eyebrow>
                <h2 className="t-h2 mt-6 text-[2.25rem] sm:text-[2.75rem] lg:text-[3.2rem]">
                  Know which markets are moving
                </h2>
                <p className="t-lead mt-5" style={{ color: brand.textBody }}>
                  Track rate movement by commodity group over 3, 6, 9, or 12 months. Grain, feed
                  ingredients, aggregates and industrial, each on its own line, so a shift in one
                  market never hides inside an average.
                </p>
                <div className="mt-8">
                  <SignInButton />
                </div>
              </div>
              <div className="min-w-0 lg:col-span-7">
                <CommodityMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ── ROLE PAGES ─────────────────────────────────────── */}
        <section className="bg-white py-24 lg:py-28">
          <div className="shell">
            <div className="max-w-2xl">
              <Eyebrow>By role</Eyebrow>
              <h2 className="t-h2 mt-6 text-[2.25rem] sm:text-[3rem] lg:text-[3.6rem]">
                One source of truth, whichever side you&apos;re on
              </h2>
              <p className="t-lead mt-5" style={{ color: brand.textBody }}>
                The data underneath is the same 14 years of settled bulk freight. What changes is
                the job it does for you.
              </p>
            </div>

            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {icpList.map((icp) => (
                <li key={icp.slug}>
                  <Link
                    href={`/${icp.slug}`}
                    className="group flex h-full flex-col overflow-hidden border transition-colors duration-200 hover:border-black/25"
                    style={{ borderColor: brand.border }}
                  >
                    <div className="relative h-40">
                      <Photo slot={icp.slug} tone="light" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="t-h3 text-[19px]">{icp.nav}</h3>
                      <p
                        className="mt-1.5 text-[15px] font-semibold leading-snug"
                        style={{ color: brand.text }}
                      >
                        {icp.headline} {icp.headlineAccent}
                      </p>
                      <p
                        className="t-body mt-3 flex-1 text-[15px]"
                        style={{ color: brand.textBody }}
                      >
                        {icp.sub}
                      </p>
                      <span
                        className="mt-6 inline-flex items-center gap-1.5 border-t pt-4 text-sm font-semibold"
                        style={{ borderColor: brand.border, color: brand.ink }}
                      >
                        See how it works
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          strokeWidth={2.5}
                          style={{ color: brand.text }}
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
