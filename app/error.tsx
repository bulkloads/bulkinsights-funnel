"use client";

import Link from "next/link";
import { brand } from "@/lib/brand";

/**
 * The branded page a visitor gets instead of a blank screen when a render
 * throws in the browser: a client component failing after hydration, or during
 * a client-side navigation between these pages.
 *
 * **Not** the pricing fetch's own failure, despite the obvious guess. When
 * Insights cannot be reached during an ISR regeneration
 * `lib/insights-plans.ts` throws, and a request that finds no previous entry to
 * keep gets a 500 — but these pages are statically generated, and a prerender
 * that throws is abandoned by Next before any React boundary renders into it.
 * That answer comes from `pages/500.tsx`; see the note there, which records how
 * both were checked.
 *
 * `reset()` re-renders the segment, which is worth offering: a transient
 * failure often survives one attempt and not two.
 *
 * Route-segment boundary, not `global-error.tsx`: it wraps the page, so the
 * header and the fonts from the root layout are still there around it.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="portal-scope flex min-h-[70vh] items-center bg-white" style={{ color: brand.ink }}>
      <div className="shell py-24">
        <div className="max-w-xl">
          <div
            className="t-eyebrow flex items-center gap-3 border-t pt-3"
            style={{ borderColor: brand.border, color: brand.textMuted }}
          >
            Something went wrong
          </div>

          <h1 className="t-h2 mt-6 text-[2.25rem] sm:text-[2.75rem]">
            This page did not load
          </h1>

          <p className="t-lead mt-5" style={{ color: brand.textBody }}>
            A temporary problem stopped us building this page. Nothing is wrong with your
            account and nothing has been charged. Try again in a moment, or call us on{" "}
            <a href="tel:18005189240" className="underline underline-offset-2">
              1-800-518-9240
            </a>{" "}
            and we will help.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center px-5 py-[12.8px] text-[15.2px] font-medium tracking-[-0.01em] transition-colors duration-200"
              style={{
                background: brand.orange,
                color: brand.ink,
                borderRadius: brand.radiusButton,
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center border px-5 py-[12.8px] text-[15.2px] font-medium tracking-[-0.01em] transition-colors duration-200 hover:bg-black/[0.04]"
              style={{
                borderColor: brand.border,
                color: brand.text,
                borderRadius: brand.radiusButton,
              }}
            >
              Back to home
            </Link>
          </div>

          {/* The only handle support has on a specific failure: the server keeps
              the stack, the browser gets this. Shown rather than swallowed. */}
          {error.digest && (
            <p className="mt-8 text-[13px]" style={{ color: brand.textMuted }}>
              Reference: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
