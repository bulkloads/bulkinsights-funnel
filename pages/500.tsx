import { brand } from "@/lib/brand";

/**
 * The branded page behind a server error, including the one this site can
 * actually produce on its own.
 *
 * When Insights cannot be reached during an ISR regeneration,
 * `lib/insights-plans.ts` throws so Next discards the regeneration and keeps
 * serving the last good render. That is the whole design and it is invisible.
 * A request that finds **no** previous entry to keep — a region that has never
 * rendered this page, or has evicted it — has nothing to keep, and the throw
 * reaches the visitor as a 500.
 *
 * `app/error.tsx` does not cover that case, which is why this file exists as
 * well rather than instead. The ICP pages are statically generated, and a
 * prerender that throws fails before any React error boundary can render into
 * it: Next abandons the render and answers with its own error page. Verified on
 * 15.5.15 by deleting a route's cache entry and requesting it — with only
 * `app/error.tsx` present the response is Next's unstyled "500: Internal Server
 * Error"; with this file it is this one. The two cover different failures and
 * both are worth having: this one server errors, `app/error.tsx` a client
 * component throwing after hydration or during navigation.
 *
 * Pages router, because that is the only thing Next consults for a server error
 * page. So: no root layout, no `globals.css` (a pages route may not import it
 * without a `_app`), no web fonts. Everything here is inline and the type falls
 * back to the system stack, which is the right trade for a page almost nobody
 * sees and nobody should see for long.
 */
export default function ServerError() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        display: "flex",
        alignItems: "center",
        background: brand.offWhite,
        color: brand.ink,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      <div style={{ maxWidth: "36rem", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div
          style={{
            borderTop: `1px solid ${brand.border}`,
            paddingTop: "0.75rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: brand.textMuted,
          }}
        >
          Something went wrong
        </div>

        <h1
          style={{
            marginTop: "1.5rem",
            fontSize: "2.5rem",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          This page did not load
        </h1>

        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "1.125rem",
            lineHeight: 1.6,
            color: brand.textBody,
          }}
        >
          A temporary problem stopped us building this page. Nothing is wrong with your
          account and nothing has been charged. Reload in a moment, or call us on{" "}
          <a href="tel:18005189240" style={{ color: brand.ink }}>
            1-800-518-9240
          </a>{" "}
          and we will help.
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex",
            marginTop: "2.25rem",
            padding: "12.8px 20px",
            fontSize: "15.2px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            textDecoration: "none",
            background: brand.orange,
            color: brand.ink,
            borderRadius: brand.radiusButton,
          }}
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
