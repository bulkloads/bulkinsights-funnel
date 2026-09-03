import type { Metadata } from "next";
import LegalPage from "@/components/portal/LegalPage";
import { legalDocs } from "@/lib/legal";

// Static legal content: prerender at build time, no data fetching.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "BulkLoads Terms of Service | Bulk Insights",
  description: `${legalDocs.bulkloads.entity} Terms of Service for the BulkLoads.com platform account used to access BulkInsights. Last updated ${legalDocs.bulkloads.lastUpdated}.`,
};

export default function Page() {
  return <LegalPage active="bulkloads" />;
}
