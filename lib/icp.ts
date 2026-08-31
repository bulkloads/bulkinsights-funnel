import {
  BarChart3,
  Fuel,
  Gauge,
  Layers,
  MapPinned,
  Scale,
  ShieldCheck,
  FileSpreadsheet,
  Timer,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type IcpSlug = "carriers" | "brokers" | "shippers";

export type Icp = {
  slug: IcpSlug;
  nav: string;
  eyebrow: string;
  /** Page <title>. */
  metaTitle: string;
  metaDescription: string;
  headline: string;
  headlineAccent: string;
  sub: string;
  /** Three short proof points under the hero. */
  heroPoints: { stat: string; label: string }[];
  /** The job-to-be-done section. */
  jobTitle: string;
  jobBody: string;
  pullQuote: string;
  capabilities: { icon: LucideIcon; title: string; body: string }[];
  spotlight: {
    label: string;
    title: string;
    body: string;
    bullets: string[];
    mockup: "rating" | "commodity" | "margin";
  };
  ctaTitle: string;
  ctaBody: string;
};

/**
 * Positioning per ICP. The shared product story is the same for all three
 * (14 years of real, settled bulk freight data), but the job-to-be-done differs,
 * which is what each page leads with.
 */
export const icps: Record<IcpSlug, Icp> = {
  carriers: {
    slug: "carriers",
    nav: "Carriers",
    eyebrow: "For carriers & owner operators",
    metaTitle: "Bulk Insights for Carriers | Get paid what you're worth",
    metaDescription:
      "Fuel-adjusted cost per mile and confidence-scored lane benchmarks from 14 years of settled bulk freight. Know what a lane really pays before you take it.",
    headline: "Get paid",
    headlineAccent: "what you're worth.",
    sub: "You know your costs better than anyone. Bulk Insights gives you the other half of the equation: what the lane has actually been paying, so you can hold your number instead of guessing at it.",
    heroPoints: [
      { stat: "14 yrs", label: "of settled freight behind every rate" },
      { stat: "5", label: "equipment types matched exactly" },
      { stat: "33", label: "commodities covered" },
    ],
    jobTitle: "Stop negotiating in the dark",
    jobBody:
      "A broker on the other end of the phone knows what the lane has paid. Until now, you mostly didn't. That asymmetry is the whole reason rates get talked down: not because the freight isn't worth it, but because you had nothing to point at. Bulk Insights closes that gap with the same settled-freight record they're working from.",
    pullQuote:
      "It isn't just a rate. It's a rate you can stand behind when someone pushes back.",
    capabilities: [
      {
        icon: Fuel,
        title: "Fuel-adjusted cost per mile",
        body: "Rates carry fuel adjustment and cost-per-mile built in, so the number in front of you reflects real margin instead of a gross figure that looks better than it is.",
      },
      {
        icon: Truck,
        title: "Lane rates matched to your equipment",
        body: "Hopper, end dump, walking floor, belt, and pneumatic are priced separately. No averaging your equipment in with someone else's.",
      },
      {
        icon: Gauge,
        title: "Confidence scoring",
        body: "Every benchmark is scored on how closely the underlying freight matches your lane, so you know when to lean on the number hard and when to treat it as a directional read.",
      },
      {
        icon: BarChart3,
        title: "Commodity trends",
        body: "Rate movement by commodity group over 3, 6, 9, or 12 months. Know when your market is firming before you lock in a rate you'll regret.",
      },
      {
        icon: MapPinned,
        title: "Regional load volume",
        body: "See where freight is concentrating across the BulkLoads network so you can position equipment ahead of the market instead of chasing it.",
      },
      {
        icon: Wallet,
        title: "Know a bad lane before you take it",
        body: "Run the lane before you commit the truck. The cheapest load to turn down is the one you never booked.",
      },
    ],
    spotlight: {
      label: "Rating tool",
      title: "Run the lane before you commit the truck",
      body: "Enter origin, destination, and equipment type. Bulk Insights matches it against settled freight inside the geo-fence and returns low, average, and high benchmarks (per mile and per load) with a confidence score attached.",
      bullets: [
        "Low / average / high, per mile and per load",
        "Geo-fenced matching, not a national average",
        "Confidence score on every estimate",
      ],
      mockup: "rating",
    },
    ctaTitle: "Know what the lane pays.",
    ctaBody:
      "Fourteen years of settled bulk freight, on your side of the negotiation for once.",
  },

  brokers: {
    slug: "brokers",
    nav: "Brokers",
    eyebrow: "For brokers",
    metaTitle: "Bulk Insights for Brokers | Quote fast, defend every number",
    metaDescription:
      "Confidence-scored lane benchmarks built from 14 years of settled bulk freight. Quote in seconds and back every number in the negotiation.",
    headline: "Quote fast.",
    headlineAccent: "Defend every number.",
    sub: "Speed wins the load. Defensibility keeps the margin. Bulk Insights gives you both: an instant benchmark for any bulk lane, and the evidence to hold it when a shipper or carrier pushes back.",
    heroPoints: [
      { stat: "Seconds", label: "from lane to benchmark" },
      { stat: "100-pt", label: "confidence score per estimate" },
      { stat: "14 yrs", label: "of settled freight behind it" },
    ],
    jobTitle: "A rate is only as good as what's behind it",
    jobBody:
      "Anyone can produce a number. The question that decides the negotiation is where it came from. Bulk Insights scores every benchmark on how closely the underlying freight matches the lane in front of you. So when you quote, you're not asserting a rate, you're citing one.",
    pullQuote:
      "It's not just a rate. It's a rate you can stand behind in a negotiation.",
    capabilities: [
      {
        icon: Timer,
        title: "Benchmarks in seconds",
        body: "Origin, destination, equipment type. You have a defensible range before the shipper finishes describing the load.",
      },
      {
        icon: ShieldCheck,
        title: "Defensibility built in",
        body: "Confidence scoring tells you and your counterparty exactly how well the comparable freight matches. That turns a quote into a position.",
      },
      {
        icon: Scale,
        title: "Protect your spread",
        body: "Fuel-adjusted cost per mile on both sides of the transaction, so you can see the margin before you commit to either end of it.",
      },
      {
        icon: Truck,
        title: "Equipment-specific pricing",
        body: "Bulk equipment prices differently. Hopper, end dump, walking floor, belt, and pneumatic each carry their own benchmark.",
      },
      {
        icon: BarChart3,
        title: "Commodity trends",
        body: "Rate movement by commodity group over 3 to 12 months, so you can tell a customer where the market is heading and be right.",
      },
      {
        icon: Layers,
        title: "Coverage where it counts",
        body: "33 commodities across dry and liquid bulk: the freight general rate tools average into the noise.",
      },
      {
        icon: FileSpreadsheet,
        title: "Price a whole RFP, not one lane",
        body: "Work a bid sheet lane by lane against settled freight instead of guessing at the long tail. The risk in an RFP is winning the lanes you underpriced, and a confidence score on every line tells you which ones those are before you submit.",
      },
    ],
    spotlight: {
      label: "Margin tool",
      title: "See your spread before you commit to it",
      body: "The margin tool sits with the rate results. Set your target margin and the benchmark turns into a buy, a sell, and the spread between them, per mile and per load. You know what the load is worth to you before you quote it.",
      bullets: [
        "Set target margin and see buy, sell, and spread",
        "Cost per mile on both sides of the transaction",
        "Backed by the same confidence-scored benchmark",
      ],
      mockup: "margin",
    },
    ctaTitle: "Quote it. Then defend it.",
    ctaBody:
      "Fourteen years of settled bulk freight, scored and ready before the call ends.",
  },

  shippers: {
    slug: "shippers",
    nav: "Shippers",
    eyebrow: "For shippers",
    metaTitle: "Bulk Insights for Shippers | Know what your freight should cost",
    metaDescription:
      "An independent read on bulk freight costs, including multi-modal comparison across truck, rail, barge, and vessel. Validate carrier pricing and budget lanes with confidence.",
    headline: "Know what your freight",
    headlineAccent: "should actually cost.",
    sub: "You're quoted a number and asked to trust it. Bulk Insights gives you an independent benchmark built from settled freight, plus a view across modes that general rate tools simply don't offer.",
    heroPoints: [
      { stat: "4 modes", label: "truck, rail, barge, vessel" },
      { stat: "14 yrs", label: "of settled freight data" },
      { stat: "33", label: "commodities covered" },
    ],
    jobTitle: "An independent read, not a vendor's word",
    jobBody:
      "Every quote you receive comes from someone with a position in the outcome. Bulk Insights doesn't. It reports what bulk freight has actually settled at across the BulkLoads network, so you can tell the difference between a fair number and an opportunistic one, and budget the lane before you go to market.",
    pullQuote:
      "Comparing modes on the same freight is something almost no general TMS or rate tool will show you.",
    capabilities: [
      {
        icon: Scale,
        title: "Multi-modal cost comparison",
        body: "Compare what the same freight costs by truck, rail, barge, and vessel. Most general TMS and rate tools price a single mode and leave the trade-off invisible.",
      },
      {
        icon: ShieldCheck,
        title: "Validate carrier pricing",
        body: "Hold every quote you receive against an independent benchmark drawn from settled freight rather than a vendor's own book.",
      },
      {
        icon: Gauge,
        title: "Confidence scoring",
        body: "Each benchmark tells you how closely the comparable freight matches your lane, so a thin lane never gets presented as a firm number.",
      },
      {
        icon: BarChart3,
        title: "Commodity trends",
        body: "Rate movement by commodity group over 3 to 12 months: the context you need when planning a season, not just a load.",
      },
      {
        icon: Wallet,
        title: "Budget lanes with real numbers",
        body: "Build freight budgets on what the market has actually paid, then test them against what carriers come back with.",
      },
      {
        icon: MapPinned,
        title: "Regional market context",
        body: "See where capacity is tight and where it isn't, so you know whether a quote reflects the market or the moment.",
      },
      {
        icon: FileSpreadsheet,
        title: "Build and score an RFP",
        body: "Set realistic targets on every lane before the bid goes out, then hold the responses that come back against the same benchmark. You learn which lanes are priced to attract capacity and which will sit unawarded.",
      },
    ],
    spotlight: {
      label: "Commodity trends",
      title: "Plan the season, not just the load",
      body: "Rate movement by commodity group over 3, 6, 9, or 12 months. Grain, feed ingredients, aggregates and industrial each track on their own line, so you can time a bid and build a freight budget against where your market is actually heading.",
      bullets: [
        "Compare commodity groups on a single chart",
        "Zoom the window from three months to a full year",
        "Budget and time bids against real movement",
      ],
      mockup: "commodity",
    },
    ctaTitle: "Stop taking the quote on faith.",
    ctaBody:
      "Fourteen years of settled bulk freight, so you know a fair number when you see one.",
  },
};

export const icpList = [icps.carriers, icps.brokers, icps.shippers];
