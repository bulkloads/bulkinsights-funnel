import type { AnchorHTMLAttributes } from "react";

/**
 * A link that leaves this site.
 *
 * `target="_top"` because this site is also served inside an iframe —
 * BulkLoads embeds it at `www.bulkloads.com/bulk-insights/` — and an off-site
 * destination may refuse to render in a frame: the WorkOS page the sign-in
 * handoff ends on sends `frame-ancestors` and the frame shows "refused to
 * connect" instead. Even where the destination would render, an off-site
 * click means the visitor is leaving, and nesting another site inside the
 * embed is never what they asked for. When the page is not framed, `_top` is
 * this same window and nothing changes.
 *
 * Internal navigation deliberately does not use this: it stays in the frame.
 * The embed contract, including what the embedder has to keep true for `_top`
 * to work, is in HANDOFF.md under "Embedding".
 *
 * A plain `<a>` rather than `next/link`. For a cross-origin href Link neither
 * prefetches nor client-routes, so it would be a second spelling of the same
 * anchor, and one that reads `target` back off the DOM to decide to stand
 * aside.
 */
export default function OffsiteLink({
  children,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target"> & { href: string }) {
  return (
    <a {...props} target="_top">
      {children}
    </a>
  );
}
