import Image from "next/image";

/* Real product screenshots (replacing the earlier hand-built CSS mockups).
   Each file carries its own dark UI chrome, rounded corners, and drop
   shadow, so they render frameless. Exports keep the original names so
   call sites (IcpPage spotlight, home page) are unchanged. Files live in
   /public/media; replace the file to update a shot, no code change. */

export function RatingMockup() {
  return (
    <Image
      src="/media/screenshot-rating.png"
      width={765}
      height={555}
      alt="Bulk Insights rate estimate for corn showing low, average, and high benchmarks per mile with totals and an 87 out of 100 confidence score"
      className="h-auto w-full"
    />
  );
}

export function MarginMockup() {
  return (
    <Image
      src="/media/screenshot-rating-margin.png"
      width={774}
      height={594}
      alt="Bulk Insights rate estimate for corn with a 10 percent margin applied, showing market rate, margin, and your rate for low, average, and high benchmarks"
      className="h-auto w-full"
    />
  );
}

export function CommodityMockup() {
  return (
    <Image
      src="/media/screenshot-commodity-trends.png"
      width={1165}
      height={646}
      alt="Rate trends by commodity group over six months, with grain, feed ingredients, aggregates and industrial, and other tracked as separate lines"
      className="h-auto w-full"
    />
  );
}
