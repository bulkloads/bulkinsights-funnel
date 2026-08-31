import type { Metadata } from "next";
import IcpPage from "@/components/portal/IcpPage";
import { icps } from "@/lib/icp";

const icp = icps.shippers;

export const metadata: Metadata = {
  title: icp.metaTitle,
  description: icp.metaDescription,
};

export default function Page() {
  return <IcpPage icp={icp} />;
}
