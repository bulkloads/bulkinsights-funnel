import type { Metadata } from "next";
import LegalPage from "@/components/portal/LegalPage";
import { legalDocs } from "@/lib/legal";

// Static legal content: prerender at build time, no data fetching.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms of Service | Bulk Insights",
  description: `${legalDocs.bulkinsights.entity} Terms of Service for the BulkInsights analytics platform. Last updated ${legalDocs.bulkinsights.lastUpdated}.`,
};

export default function Page() {
  return <LegalPage active="bulkinsights" />;
}
