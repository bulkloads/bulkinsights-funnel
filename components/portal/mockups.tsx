import Image from "next/image";

/* Real product screenshots (replacing the earlier hand-built CSS mockups).
   Each file carries its own dark UI chrome, rounded corners, and drop
   shadow, so they render frameless. Exports keep the original names so
   call sites (IcpPage spotlight, home page) are unchanged. Files live in
   /public/media; replace the file to update a shot, no code change. */

/**
 * The two layouts a screenshot is placed into.
 *
 * Both facts about a slot live here rather than at the call site: `sizes`,
 * which decides which rendition a phone downloads, and `cap`, the composition's
 * own width ceiling. A screenshot appears in more than one slot (`RatingMockup`
 * is the home hero *and* the carrier spotlight), so neither can be a property
 * of the file, and leaving them in the page markup means the next placement
 * quietly gets neither.
 *
 * `sizes` is the width the image will occupy, as a media query the browser can
 * answer before layout. Without it `next/image` emits a 1x/2x srcset off the
 * declared width and a phone downloads the full-width rendition of a picture it
 * will draw at 350 CSS px.
 */
const SLOTS = {
  /**
   * The home hero panel: `lg:col-span-5` of the 12-column shell, bleeding past
   * the container's right edge on a wide viewport. That bleed is why a
   * composition ceiling exists at all — the panel keeps growing with the
   * window, and 640 is where the hero holds it. Scoped to `lg` because that is
   * where the bleed and the two-column split begin; below it the panel is a
   * stacked full-width figure, exactly as it was when this class lived on the
   * wrapper in app/page.tsx.
   */
  homeHero: { sizes: "(min-width: 1024px) 640px, 100vw", cap: "lg:max-w-[640px]" },
  /**
   * A spotlight figure: `lg:col-span-7` beside its copy, in a `gap-x-14` grid.
   * That column tops out at ~668px inside the 1248px shell, so the composition
   * imposes no ceiling of its own and only the asset's width below binds.
   */
  spotlight: {
    sizes: "(min-width: 1248px) 668px, (min-width: 1024px) 54vw, 100vw",
    cap: "",
  },
} as const;

type MockupProps = {
  /** Which layout this instance sits in. Spotlight is the common case. */
  slot?: keyof typeof SLOTS;
  /**
   * Eager-load and preload this image. True for the home hero and nothing
   * else: it is the LCP element and lazy-loading it made it pop in after the
   * copy had already painted. Every other placement is below the fold and must
   * stay lazy.
   */
  priority?: boolean;
};

function Mockup({
  src,
  width,
  height,
  alt,
  slot = "spotlight",
  priority = false,
}: {
  src: string;
  /** The file's own pixel width. Also the hard ceiling: see below. */
  width: number;
  height: number;
  alt: string;
} & MockupProps) {
  const { sizes, cap } = SLOTS[slot];
  return (
    // Two ceilings, and they are different rules. The slot's is a composition
    // decision and applies at the breakpoint that composition starts at, so it
    // is a class on a wrapper this component owns rather than something a page
    // remembers to add.
    <div className={cap}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
        // The asset's is absolute: never drawn larger than the file is, at any
        // width, in any slot. Derived from the declared width rather than
        // written out beside it, so swapping in a screenshot of a different
        // size cannot silently start upscaling, and neither can a new, wider
        // placement.
        style={{ maxWidth: width }}
      />
    </div>
  );
}

export function RatingMockup(props: MockupProps) {
  return (
    <Mockup
      {...props}
      src="/media/screenshot-rating.png"
      width={765}
      height={555}
      alt="Bulk Insights rate estimate for corn showing low, average, and high benchmarks per mile with totals and an 87 out of 100 confidence score"
    />
  );
}

export function MarginMockup(props: MockupProps) {
  return (
    <Mockup
      {...props}
      src="/media/screenshot-rating-margin.png"
      width={774}
      height={594}
      alt="Bulk Insights rate estimate for corn with a 10 percent margin applied, showing market rate, margin, and your rate for low, average, and high benchmarks"
    />
  );
}

export function CommodityMockup(props: MockupProps) {
  return (
    <Mockup
      {...props}
      src="/media/screenshot-commodity-trends.png"
      width={1165}
      height={646}
      alt="Rate trends by commodity group over six months, with grain, feed ingredients, aggregates and industrial, and other tracked as separate lines"
    />
  );
}
