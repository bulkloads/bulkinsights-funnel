import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import HeroMedia from "@/components/portal/HeroMedia";
import {
  ClosingCta,
  CtaPair,
  Eyebrow,
  SignInButton,
  SiteFooter,
  SiteHeader,
} from "@/components/portal/shared";
import { CommodityMockup, MarginMockup, RatingMockup } from "@/components/portal/mockups";
import { brand } from "@/lib/brand";
import { icpList, type Icp } from "@/lib/icp";

export default function IcpPage({ icp }: { icp: Icp }) {
  const others = icpList.filter((o) => o.slug !== icp.slug);
  const Spotlight =
    icp.spotlight.mockup === "commodity"
      ? CommodityMockup
      : icp.spotlight.mockup === "margin"
      ? MarginMockup
      : RatingMockup;

  return (
    <div className="portal-scope min-h-screen bg-white" style={{ color: brand.ink }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        {/* ── HERO ────────────────────────────────────────────
            Split composition: copy on navy, photography holding
            the right half rather than a centred column. */}
        <section className="relative isolate overflow-hidden" style={{ background: brand.ink }}>
          <div className="absolute inset-0 -z-10">
            <HeroMedia
              slot={`${icp.slug}Hero` as const}
              priority
              scrim={"linear-gradient(90deg, rgba(19,19,18,0.94) 0%, rgba(19,19,18,0.86) 45%, rgba(19,19,18,0.62) 100%)"}
            />
          </div>

          <div className="shell">
            <div className="max-w-[36rem] py-20 lg:py-28">
              <Eyebrow onDark>{icp.eyebrow}</Eyebrow>

              <h1 className="t-display mt-6 text-[2.6rem] text-white sm:text-[3.5rem] lg:text-[4rem]">
                {icp.headline}
                <br />
                <span style={{ color: brand.orange }}>{icp.headlineAccent}</span>
              </h1>

              <p className="t-lead mt-6" style={{ color: brand.textOnDark }}>
                {icp.sub}
              </p>

              <div className="mt-9">
                <CtaPair onDark />
              </div>
            </div>
          </div>

          <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.16)" }}>
            <div className="shell">
              <dl
                className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"
                style={{ borderColor: "rgba(255,255,255,0.16)" }}
              >
                {icp.heroPoints.map((p, i) => (
                  <div
                    key={p.label}
                    className={`py-6 ${i > 0 ? "sm:pl-8" : ""} ${
                      i < icp.heroPoints.length - 1 ? "sm:pr-8" : ""
                    }`}
                    style={{ borderColor: "rgba(255,255,255,0.16)" }}
                  >
                    <dt className="sr-only">{p.label}</dt>
                    <dd>
                      <div
                        className="tabular text-[1.75rem] font-bold leading-none"
                        style={{ color: brand.orange }}
                      >
                        {p.stat}
                      </div>
                      <div className="mt-1.5 text-[13px]" style={{ color: brand.textOnDarkMuted }}>
                        {p.label}
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM ────────────────────────────────────
            Narrow measure, pull quote set large against a rule. */}
        <section className="bg-white py-24 lg:py-28">
          <div className="shell">
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-4">
                <Eyebrow>The problem</Eyebrow>
                <h2 className="t-h2 mt-6 text-[2.25rem] sm:text-[2.75rem] lg:text-[3.2rem]">{icp.jobTitle}</h2>
              </div>
              <div className="min-w-0 lg:col-span-7 lg:col-start-6">
                <p className="t-lead" style={{ color: brand.textBody }}>
                  {icp.jobBody}
                </p>
                <p
                  className="t-h3 mt-10 border-t pt-8 text-[1.5rem] sm:text-[1.75rem]"
                  style={{ borderColor: brand.border }}
                >
                  {icp.pullQuote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU GET ───────────────────────────────────── */}
        <section className="py-24 lg:py-28" style={{ background: brand.offWhite }}>
          <div className="shell">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-4">
                <Eyebrow>What you get</Eyebrow>
                <h2 className="t-h2 mt-6 text-[2.25rem] sm:text-[2.75rem] lg:text-[3.2rem]">
                  Built for how you actually work
                </h2>
              </div>

              <ol className="lg:col-span-7 lg:col-start-6">
                {icp.capabilities.map((c, i) => (
                  <li
                    key={c.title}
                    className={`grid grid-cols-[auto_1fr] gap-x-6 border-t py-6 ${
                      i === icp.capabilities.length - 1 ? "border-b" : ""
                    }`}
                    style={{ borderColor: brand.border }}
                  >
                    <span className="t-index pt-0.5 text-sm" style={{ color: brand.textMuted }}>
                      {String(i + 1).padStart(2, "0")}
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

        {/* ── SPOTLIGHT ──────────────────────────────────────── */}
        <section className="bg-white py-24 lg:py-28">
          <div className="shell">
            <div className="grid items-center gap-x-14 gap-y-12 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-5">
                <Eyebrow>{icp.spotlight.label}</Eyebrow>
                <h2 className="t-h2 mt-6 text-[2.25rem] sm:text-[2.75rem] lg:text-[3.2rem]">{icp.spotlight.title}</h2>
                <p className="t-lead mt-5" style={{ color: brand.textBody }}>
                  {icp.spotlight.body}
                </p>
                <ul className="mt-8 border-t" style={{ borderColor: brand.border }}>
                  {icp.spotlight.bullets.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 border-b py-3.5"
                      style={{ borderColor: brand.border }}
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0"
                        strokeWidth={3}
                        style={{ color: brand.text }}
                      />
                      <span className="text-[15px]" style={{ color: brand.textBody }}>
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <SignInButton />
                </div>
              </div>
              <div className="min-w-0 lg:col-span-7">
                <Spotlight />
              </div>
            </div>
          </div>
        </section>

        {/* ── CROSS-LINKS ────────────────────────────────────── */}
        <section className="py-16" style={{ background: brand.offWhite }}>
          <div className="shell">
            <Eyebrow>Not quite your role?</Eyebrow>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${o.slug}`}
                    className="group flex items-center justify-between gap-4 border bg-white p-6 transition-colors duration-200 hover:border-black/25"
                    style={{ borderColor: brand.border }}
                  >
                    <div>
                      <div className="t-h3 text-[17px]">{o.nav}</div>
                      <div className="mt-1 text-sm" style={{ color: brand.textBody }}>
                        {o.headline} {o.headlineAccent}
                      </div>
                    </div>
                    <ArrowRight
                      className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={2.25}
                      style={{ color: brand.text }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ClosingCta title={icp.ctaTitle} body={icp.ctaBody} />
      </main>

      <SiteFooter />
    </div>
  );
}
