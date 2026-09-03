import type { Metadata } from "next";
import IcpPage from "@/components/portal/IcpPage";
import { icps } from "@/lib/icp";
import type { AssertRevalidateMatches } from "@/lib/insights-plans";

const icp = icps.carriers;

export const metadata: Metadata = {
  title: icp.metaTitle,
  description: icp.metaDescription,
};

/**
 * Regenerate on a schedule so advertised prices track Insights without a
 * deploy. Before this the page was built once and never revisited, so a
 * price change over there reached this site only when someone happened to
 * redeploy — an unbounded drift window on the one number a prospect reads.
 *
 * The pricing fetch passes the same window, so the page and its data expire
 * together. A regeneration that cannot reach Insights throws and leaves the
 * last good render in place; see `hasLastGoodRender` in lib/insights-plans.ts.
 *
 * Written as a literal because Next reads this by static analysis and refuses
 * an identifier. The alias below is what keeps it equal to
 * `PLANS_REVALIDATE_SECONDS`, which is what the fetch uses.
 */
export const revalidate = 3600;
type _RevalidateMatchesFetch = AssertRevalidateMatches<typeof revalidate>;

export default function Page() {
  return <IcpPage icp={icp} />;
}
