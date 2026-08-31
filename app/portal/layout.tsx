import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk Insights | Rate benchmarks for bulk freight",
  description:
    "Sign in with your BulkLoads account and price lanes in seconds. Confidence-scored rate benchmarks and commodity trends built from 14 years of settled bulk freight.",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
