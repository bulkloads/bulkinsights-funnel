"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/**
 * The Meta pixel id for Bulk Insights.
 *
 * Defaulted rather than required, the same way `INSIGHTS_ORIGIN` is: a pixel
 * id is a public identifier that ships in the page's HTML anyway, so there is
 * nothing to protect by keeping it in an environment variable, and defaulting
 * it means a correct production build needs no Vercel configuration at all.
 * The variable remains as an override for pointing a deployment at a different
 * pixel.
 */
const DEFAULT_PIXEL_ID = "1753815372362379";
const configured = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

export const META_PIXEL_ID = configured || DEFAULT_PIXEL_ID;

/**
 * Whether to load it at all.
 *
 * Off in development unless the variable is set explicitly, because a pixel
 * firing from a developer's laptop writes into the same ad account that is
 * optimising real campaigns, and a handful of fake conversions is enough to
 * teach the delivery system the wrong thing. Setting the variable locally, to
 * a throwaway id, is how you test the wiring without that.
 */
const ENABLED = process.env.NODE_ENV === "production" || Boolean(configured);

/**
 * Meta's pixel, as the standard snippet.
 *
 * The snippet fires its own `PageView` when it loads, which covers the first
 * document load and nothing else. This is an App Router site, so moving
 * between pages is a client-side navigation with no document load and no
 * further PageView. Unlike GA4, Meta has no setting that covers this, so the
 * effect below sends one on every route change, skipping the first because the
 * snippet already sent it.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const initialPath = useRef(pathname);

  useEffect(() => {
    if (!ENABLED) return;
    // The snippet's own PageView covers the path the visitor landed on.
    if (pathname === initialPath.current) return;
    try {
      window.fbq?.("track", "PageView");
    } catch {
      /* Analytics is never worth breaking a navigation over. */
    }
  }, [pathname]);

  if (!ENABLED) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
