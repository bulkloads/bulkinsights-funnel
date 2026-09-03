import Link from "next/link";
import { Eyebrow, SiteFooter, SiteHeader } from "@/components/portal/shared";
import { brand } from "@/lib/brand";
import { legalDocList, legalDocs, type LegalBlock, type LegalDocKey } from "@/lib/legal";

/* ──────────────────────────────────────────────────────────────
   Inline links

   Legal prose carries live emails, URLs and a support phone number.
   They are turned into real links WITHOUT altering a character of the
   text, so the reproduction stays verbatim.
   ────────────────────────────────────────────────────────────── */

const LINK_RE =
  /(https?:\/\/[^\s]+)|([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})|(1-800-518-9240)/g;

const linkStyle = { color: brand.text } as const;
const linkClass =
  "underline decoration-[color:var(--rule)] decoration-1 underline-offset-2 transition-colors hover:decoration-[color:var(--orange)]";

function linkify(text: string): Array<React.ReactNode> {
  const out: Array<React.ReactNode> = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const index = m.index ?? 0;
    if (index > last) out.push(text.slice(last, index));

    const [full, url, email, phone] = m;
    if (url) {
      // Keep trailing sentence punctuation out of the href and as plain text.
      const trailing = url.match(/[.,;]+$/)?.[0] ?? "";
      const href = url.slice(0, url.length - trailing.length);
      out.push(
        <a key={key++} href={href} className={linkClass} style={linkStyle}>
          {href}
        </a>,
      );
      if (trailing) out.push(trailing);
    } else if (email) {
      out.push(
        <a key={key++} href={`mailto:${email}`} className={linkClass} style={linkStyle}>
          {email}
        </a>,
      );
    } else if (phone) {
      out.push(
        <a key={key++} href="tel:18005189240" className={linkClass} style={linkStyle}>
          {phone}
        </a>,
      );
    }
    last = index + full.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/* ──────────────────────────────────────────────────────────────
   Blocks
   ────────────────────────────────────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "heading") {
    return (
      <h2
        id={slugify(block.text)}
        className="t-h4 mt-12 scroll-mt-24 border-t pt-8 text-[15px] font-semibold uppercase tracking-[0.02em] first:mt-0 first:border-t-0 first:pt-0"
        style={{ borderColor: brand.border, color: brand.ink }}
      >
        {block.text}
      </h2>
    );
  }
  if (block.kind === "subheading") {
    return (
      <h3
        id={slugify(block.text)}
        className="mt-8 scroll-mt-24 text-[15px] font-semibold"
        style={{ color: brand.ink }}
      >
        {block.text}
      </h3>
    );
  }
  return (
    <p className="t-body mt-4 text-[15px]" style={{ color: brand.textBody }}>
      {linkify(block.text)}
    </p>
  );
}

/* ──────────────────────────────────────────────────────────────
   Tabs

   The site carries two Terms documents because signing up for the
   BulkInsights product uses a BulkLoads platform account, so both
   sets of terms are in force. The tabs make switching obvious and
   label which entity each belongs to.
   ────────────────────────────────────────────────────────────── */

const tabHref: Readonly<Record<LegalDocKey, string>> = {
  bulkinsights: "/terms",
  bulkloads: "/terms/bulkloads",
};

const tabRole: Readonly<Record<LegalDocKey, string>> = {
  bulkinsights: "The product",
  bulkloads: "Platform account",
};

function LegalTabs({ active }: { active: LegalDocKey }) {
  return (
    <nav aria-label="Terms documents" className="mt-10 grid gap-3 sm:grid-cols-2">
      {legalDocList.map((doc) => {
        const isActive = doc.key === active;
        return (
          <Link
            key={doc.key}
            href={tabHref[doc.key]}
            aria-current={isActive ? "page" : undefined}
            className="group flex flex-col gap-1 border p-4 transition-colors duration-200"
            style={{
              borderColor: isActive ? brand.ink : brand.border,
              background: isActive ? brand.ink : brand.white,
            }}
          >
            <span
              className="t-eyebrow"
              style={{ color: isActive ? brand.orange : brand.textMuted }}
            >
              {tabRole[doc.key]}
            </span>
            <span
              className="text-[15px] font-semibold tracking-[-0.01em]"
              style={{ color: isActive ? brand.white : brand.ink }}
            >
              {doc.navLabel} Terms of Service
            </span>
            <span
              className="text-[13px]"
              style={{ color: isActive ? brand.textOnDark : brand.textBody }}
            >
              {doc.entity}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────── */

export default function LegalPage({ active }: { active: LegalDocKey }) {
  const doc = legalDocs[active];
  const other = legalDocList.find((d) => d.key !== active)!;

  return (
    <div className="portal-scope min-h-screen bg-white" style={{ color: brand.ink }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="bg-white py-16 lg:py-20">
          <div className="shell">
            <div className="max-w-2xl">
              <Eyebrow>Legal</Eyebrow>
              <h1 className="t-h2 mt-6 text-[2rem] sm:text-[2.5rem]">Terms of Service</h1>
              <p className="t-lead mt-5" style={{ color: brand.textBody }}>
                BulkInsights is the analytics product on this site. You reach it with a
                BulkLoads platform account, so both sets of terms below apply to your use.
              </p>
            </div>

            <LegalTabs active={active} />
          </div>
        </section>

        {/* Document */}
        <section className="border-t bg-white pb-24 pt-12 lg:pb-28" style={{ borderColor: brand.border }}>
          <div className="shell">
            <div className="max-w-2xl">
              <header className="border-b pb-8" style={{ borderColor: brand.border }}>
                <div className="t-eyebrow" style={{ color: brand.textMuted }}>
                  {doc.navLabel}
                </div>
                <h2 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                  {doc.title}
                </h2>
                <p className="mt-3 text-[14px]" style={{ color: brand.textBody }}>
                  {doc.entity}, {doc.entityNote}.
                </p>
                <p className="mt-1 text-[14px]" style={{ color: brand.textMuted }}>
                  Last updated {doc.lastUpdated}.
                </p>
                <p className="t-body mt-5 text-[14px]" style={{ color: brand.textBody }}>
                  {doc.summary} Looking for the {other.navLabel} terms instead?{" "}
                  <Link
                    href={tabHref[other.key]}
                    className={linkClass}
                    style={linkStyle}
                  >
                    Read the {other.navLabel} Terms of Service
                  </Link>
                  .
                </p>
              </header>

              <div className="mt-10">
                {doc.blocks.map((block, i) => (
                  <Block key={`${block.kind}-${i}`} block={block} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
