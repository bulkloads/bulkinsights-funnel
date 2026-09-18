# Bulk Insights — developer handoff

Marketing site for Bulk Insights, built to match the BulkLoads v2 public
site so the three properties read as one family.

## Run it

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

Node 18+. No database. Every page is statically prerendered.

One optional environment variable:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_INSIGHTS_URL` | `https://insights.bulkloads.com` | Origin the Sign in / Sign up buttons point at. Set it to an Insights preview deployment to test the handoff. |

It is read in `lib/brand.ts`. `NEXT_PUBLIC_` values are inlined at build
time, so changing it needs a redeploy, not just a restart.

## What's where

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Landing page |
| `/carriers` | `app/carriers/page.tsx` | Role page |
| `/brokers` | `app/brokers/page.tsx` | Role page |
| `/shippers` | `app/shippers/page.tsx` | Role page |

The three role pages are thin route files. All of their copy lives in
`lib/icp.ts` and they share one template, `components/portal/IcpPage.tsx`.
**Edit the copy in `lib/icp.ts`, not in the route files.**

```
lib/
  brand.ts      design tokens (colour, type, shape, spacing) + CTA URLs
  icp.ts        all role-page copy, per persona
  media.ts      every image and video slot on the site
  ticker.ts     market ticker rows
components/portal/
  shared.tsx    header, footer, closing CTA, buttons
  IcpPage.tsx   shared template for the three role pages
  HeroMedia.tsx hero video with poster fallback
  MarketTicker.tsx
  mockups.tsx   product screenshots, their layout slots and image priority
  Photo.tsx     still image slots
app/globals.css design system: type scale, focus, reduced motion
app/error.tsx   branded boundary for a client render error
pages/500.tsx   branded server error page. The one pages-router file, because
                it is the only thing Next consults for a 500; the note in it
                explains why app/error.tsx does not cover that case.
```

The previous design (the old `/` and `/preview` pages) has been removed;
this site now serves from the root.

## Design system

Full spec, including every contrast ratio and a copy-paste CSS token
block: **https://claude.ai/code/artifact/774ad0b4-16bb-41cb-83d5-720ed2c621bb**

Three rules that are easy to break by accident:

1. **One orange, `#f37e21`.** Earlier drafts accumulated four
   near-identical oranges to work around contrast problems. Don't add a
   fifth. On a fill it carries *ink* text (6.92:1); as type it only works
   on dark grounds (6.92:1). As type on white it is 2.69:1 and fails, so
   accent type on light surfaces uses `--muted` instead.
2. **The neutrals are warm** (`#fbfbf9`, `#131312`, `#e1e1da`). A generic
   cool grey reads as a different product immediately.
3. **No em dashes in any UI string.** House rule. Use a colon, a period,
   or parentheses.

Display type is uppercase, weight 600, `-0.02em` tracking, line-height
~1.0. Buttons are weight 500 at a 10px radius; cards 16px with a 1px
border and no shadow.

## Accessibility

All four pages currently pass WCAG AA with **zero** contrast failures.
There is a skip link, one `<h1>` per page, labelled `<nav>` landmarks,
visible focus rings, and `prefers-reduced-motion` handling on both the
hero video and the ticker. Please re-check contrast after any colour
change rather than assuming.

Two non-obvious details worth preserving:

- Hero video is suppressed under `prefers-reduced-motion` and below
  768px, and the decision happens *before* the `<video>` renders,
  because CSS cannot stop playback. See `HeroMedia.tsx`.
- Grid and flex children carry `min-width: 0`. Items default to
  `min-width: auto`, so one wide child silently widens the track and
  pushes content off small screens. This caused a real mobile bug.

## CTAs

Sign in and Sign up go to Insights' front door,
`insights.bulkloads.com/api/auth/sign-in` and `/sign-up`, which owns the
WorkOS handoff. Both URLs are defined once in `lib/brand.ts`, and every
control renders `components/portal/AccountLink.tsx`, which carries the
visitor's org type, plan, campaign parameters and GA client id.

**Never describe anything as free** anywhere in the product or the
marketing pages.

## Embedding

BulkLoads serves this whole site inside a full-viewport iframe at
`www.bulkloads.com/bulk-insights/`. Two rules follow, and nothing enforces
them but the code that keeps them:

- Internal navigation stays in the frame: plain `next/link`, no `target`.
- Every link that leaves the site renders
  `components/portal/OffsiteLink.tsx`, a plain `<a target="_top">`. The
  sign-in handoff ends on WorkOS (`auth.bulkloads.com`), which sends
  `frame-ancestors` and shows "refused to connect" inside a frame; the
  footer's bulkloads.com links would otherwise render BulkLoads nested
  inside its own page. Standalone, `_top` is the same window and changes
  nothing.

Consequences to know about:

- A `_top` click needs the embedder's iframe to be unsandboxed, or to
  grant `allow-top-navigation-by-user-activation`. The live embed has no
  `sandbox`; if one is added without that flag the browser drops the click
  silently, and there is no fallback on this side.
- On sign-in or sign-up the whole tab leaves bulkloads.com. The embed's
  `allow="payment"` goes unused, because checkout happens on Insights,
  top-level.
- The GA client id is asked of `gtag('get')` rather than read off the
  `_ga` cookie, because in a cross-site frame Chrome and Safari hide that
  cookie from script. See `AccountLink.tsx`.
- The demo-booking widget (`links.bulkloads.com`, in `BookingModal.tsx`)
  does not refuse framing, so it works nested inside the embed.

## Media status

Slots are declared in `lib/media.ts`. To fill one: drop the file in
`public/media`, set the path and alt text. Nothing else changes.

**Supplied:** four hero videos, three role card photos, hero posters.

**Outstanding:**

| Item | Notes |
|---|---|
| Hero video web exports | Current files are 31-37 MB each with unused audio tracks. Web versions being re-exported at ~5 MB, no audio. **Do not ship the current files.** |
| Hero posters (3) | Carriers, brokers, shippers posters are thumbnailer frames, not frame 1, so those heroes pop when playback starts. Home is already a true frame-0 capture. |
| `homeCta` photo | Dusk, truck on a rural highway, room for text on the left |
| Margin tool screenshot | The margin panel in `mockups.tsx` was built from a description, not a screenshot. Verify it against the real UI. |
| Vector wordmark | No usable SVG exists (the old `bulkloads-logo.svg` had zero paths and was removed). `public/bulkloads-logo-transparent.png` is what ships today. |
| App icons | `app/icon.png` is only 64x64. Need 512 and 180. |
| OG image | 1200x630. **No OG or Twitter metadata is configured at all**, so links currently share with no preview card. |

## Known caveats

- **The market ticker is not live.** `lib/ticker.ts` has an `isLive`
  flag, currently `false`. The numbers are illustrative. While the flag
  is false the strip presents itself as indicative. Do not flip it until
  the rows are populated from the rate service, because a ticker that
  looks live while showing frozen numbers misleads the people it is
  meant to convince.
- The Rating Tool mockup displays sample rates on a named lane. That is
  more disclosure than the ticker, which was deliberately trimmed to
  percentages only. Worth a product decision.
- The broker card photo shows two identifiable people and third-party
  company branding. Confirm releases cover public marketing use.
