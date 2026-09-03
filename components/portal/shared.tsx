import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import AccountLink from "@/components/portal/AccountLink";
import BookingModal from "@/components/BookingModal";
import Photo from "@/components/portal/Photo";
import { brand, type OrgType } from "@/lib/brand";

/* ──────────────────────────────────────────────────────────────
   Buttons
   ────────────────────────────────────────────────────────────── */

const sizing = {
  sm: "px-4 py-2 text-[14px]",
  /** Header controls. A step up from the old sm so the pair reads as the
      primary action on the page rather than as nav furniture. */
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-5 py-[12.8px] text-[15.2px]",
  /** Hero. The one control on the page that should look like the thing to
      press, so it is deliberately larger than anything around it. */
  xl: "px-8 py-4 text-[17px]",
} as const;

type Size = keyof typeof sizing;

/**
 * The org type this control should hand to Insights, where the page it sits on
 * establishes one. Undefined on the home page, which knows nothing about the
 * visitor yet and must not guess — a wrong org type prices them wrongly.
 */
type Intent = { orgType?: OrgType };

export function SignInButton({ size = "md", orgType }: { size?: Size } & Intent) {
  return (
    <AccountLink
      action="sign-in"
      orgType={orgType}
      className={`group inline-flex items-center justify-center gap-2 font-medium tracking-[-0.01em] transition-colors duration-200 ${sizing[size]}`}
      style={{
        background: brand.orange,
        color: brand.ink,
        borderRadius: brand.radiusButton,
      }}
    >
      Sign in
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={2.5}
      />
    </AccountLink>
  );
}

export function SignUpButton({
  size = "md",
  onDark = false,
  filled = false,
  orgType,
}: {
  size?: Size;
  onDark?: boolean;
  /**
   * Orange fill instead of the outline. For the one place sign-up is the
   * only control on the screen: an outline button reads as secondary, and
   * a lone secondary CTA leaves the page without a primary action.
   */
  filled?: boolean;
} & Intent) {
  if (filled) {
    return (
      <AccountLink
        action="sign-up"
        orgType={orgType}
        className={`group inline-flex items-center justify-center gap-2 font-medium tracking-[-0.01em] transition-colors duration-200 ${sizing[size]}`}
        style={{
          background: brand.orange,
          color: brand.ink,
          borderRadius: brand.radiusButton,
        }}
      >
        Sign up
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      </AccountLink>
    );
  }

  return (
    <AccountLink
      action="sign-up"
      orgType={orgType}
      className={`inline-flex items-center justify-center border font-medium tracking-[-0.01em] transition-colors duration-200 ${sizing[size]} ${
        onDark ? "text-white hover:bg-white/10" : "hover:bg-black/[0.04]"
      }`}
      style={{
        borderColor: onDark ? "rgba(255,255,255,0.55)" : brand.border,
        color: onDark ? undefined : brand.text,
        borderRadius: brand.radiusButton,
      }}
    >
      Sign up
    </AccountLink>
  );
}

/**
 * The standard action pair. Bulk Insights is entered with a BulkLoads
 * account, so the two paths are "already a member" and "not yet", and the
 * helper line says which is which rather than leaving people guessing.
 */
export function CtaPair({
  size = "lg",
  onDark = false,
  align = "left",
  orgType,
}: {
  size?: Size;
  onDark?: boolean;
  align?: "left" | "center";
} & Intent) {
  return (
    <div className={align === "center" ? "flex flex-col items-center" : ""}>
      <div
        className={`flex flex-wrap items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <SignInButton size={size} orgType={orgType} />
        <SignUpButton size={size} onDark={onDark} orgType={orgType} />
      </div>
      <p
        className={`mt-4 text-[13px] ${align === "center" ? "text-center" : ""}`}
        style={{ color: onDark ? brand.textOnDarkMuted : brand.textMuted }}
      >
        Already a BulkLoads member? Sign in. If you&apos;re not, create an account to get
        started.
      </p>
    </div>
  );
}

/** Eyebrow label on a hairline rule. */
export function Eyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <div
      className="t-eyebrow flex items-center gap-3 border-t pt-3"
      style={{
        borderColor: onDark ? brand.borderOnDark : brand.border,
        color: onDark ? brand.orange : brand.textMuted,
      }}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Site chrome
   ────────────────────────────────────────────────────────────── */

const navLinks = [
  { href: "/carriers", label: "Carriers" },
  { href: "/brokers", label: "Brokers" },
  { href: "/shippers", label: "Shippers" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader({ orgType }: Intent = {}) {
  return (
    <>
      {/* Utility bar */}
      <div style={{ background: brand.ink }}>
        <div className="shell flex h-10 items-center justify-between gap-4">
          <p className="truncate text-[12.5px]" style={{ color: brand.textOnDark }}>
            Bulk Insights opens with your BulkLoads account.{" "}
            <AccountLink
              action="sign-up"
              orgType={orgType}
              className="font-medium underline-offset-2 hover:underline"
              style={{ color: brand.orange }}
            >
              Create one
            </AccountLink>
          </p>
          <a
            href="tel:18005189240"
            className="hidden shrink-0 items-center gap-1.5 text-[12.5px] sm:flex"
            style={{ color: brand.textOnDark }}
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2} />
            1-800-518-9240
          </a>
        </div>
      </div>

      {/* Primary nav */}
      <header
        className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md"
        style={{ borderColor: brand.border }}
      >
        <div className="shell flex h-[72px] items-center gap-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/bulkloads-logo-transparent.png"
              alt="BulkLoads Insights"
              width={130}
              height={32}
              className="h-[26px] w-auto"
              unoptimized
            />
            <span
              className="hidden border-l pl-2.5 text-[15px] font-semibold tracking-[-0.01em] sm:inline"
              style={{ borderColor: brand.border, color: brand.textMuted }}
            >
              Insights
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200 hover:bg-black/[0.04]"
                style={{ color: brand.textBody, borderRadius: brand.radiusButton }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <AccountLink
              action="sign-up"
              orgType={orgType}
              className="hidden px-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200 hover:text-black sm:block"
              style={{ color: brand.textBody }}
            >
              Sign up
            </AccountLink>
            <AccountLink
              action="sign-in"
              orgType={orgType}
              className="inline-flex items-center justify-center px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200"
              style={{
                background: brand.orange,
                color: brand.ink,
                borderRadius: brand.radiusButton,
              }}
            >
              Sign in
            </AccountLink>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ orgType }: Intent = {}) {
  return (
    <footer style={{ background: brand.ink }}>
      <div className="shell py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Image
                src="/bulkloads-logo-transparent.png"
                alt="BulkLoads Insights"
                width={110}
                height={26}
                className="h-[22px] w-auto"
                unoptimized
              />
              <span
                className="border-l pl-2.5 text-sm font-semibold"
                style={{ borderColor: "rgba(255,255,255,0.18)", color: brand.textOnDarkMuted }}
              >
                Insights
              </span>
            </div>
            <p className="t-body mt-4 text-[13px]" style={{ color: brand.textOnDarkMuted }}>
              Market intelligence for bulk freight, built on 14 years of settled shipments in
              the BulkLoads network.
            </p>
          </div>

          <div className="flex gap-14">
            <nav aria-label="Roles">
              <div className="t-eyebrow" style={{ color: brand.textOnDarkMuted }}>
                By role
              </div>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: brand.textOnDark }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Account">
              <div className="t-eyebrow" style={{ color: brand.textOnDarkMuted }}>
                Account
              </div>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <AccountLink
                    action="sign-in"
                    orgType={orgType}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: brand.textOnDark }}
                  >
                    Sign in
                  </AccountLink>
                </li>
                <li>
                  <AccountLink
                    action="sign-up"
                    orgType={orgType}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: brand.textOnDark }}
                  >
                    Sign up
                  </AccountLink>
                </li>
                <li>
                  <a
                    href="https://www.bulkloads.com"
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: brand.textOnDark }}
                  >
                    BulkLoads.com
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Legal">
              <div className="t-eyebrow" style={{ color: brand.textOnDarkMuted }}>
                Legal
              </div>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: brand.textOnDark }}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.bulkloads.com/sign_up/privacy_policy/"
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: brand.textOnDark }}
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <p
          className="mt-12 border-t pt-6 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.12)", color: brand.textOnDarkMuted }}
        >
          © {new Date().getFullYear()} BulkLoads. Market data for bulk freight professionals.
        </p>
      </div>
    </footer>
  );
}

export function ClosingCta({
  title = "Price it with confidence.",
  body = "Tighter margins, rising costs, and a market that won't sit still. Put 14 years of settled bulk freight behind your next quote.",
  orgType,
}: {
  title?: string;
  body?: string;
} & Intent) {
  return (
    <section className="relative isolate overflow-hidden" style={{ background: brand.ink }}>
      <div className="absolute inset-0 -z-10 opacity-45">
        <Photo slot="homeCta" tone="dark" />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, #131312 0%, rgba(19,19,18,0.92) 55%, rgba(19,19,18,0.7) 100%)",
        }}
      />

      <div className="shell py-24 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow onDark>Get started</Eyebrow>
          <h2 className="t-h2 mt-6 text-[2.5rem] text-white sm:text-[3rem]">{title}</h2>
          <p className="t-lead mt-5 max-w-xl" style={{ color: brand.textOnDark }}>
            {body}
          </p>
          <div className="mt-9">
            <CtaPair onDark orgType={orgType} />
          </div>
          <p className="mt-6 text-sm" style={{ color: brand.textOnDarkMuted }}>
            Prefer a walkthrough first?{" "}
            <span className="inline-block align-middle">
              <BookingModal variant="portalLink" accent={brand.orange} />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
