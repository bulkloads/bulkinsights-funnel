import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Bulk Insights | Rate benchmarks for bulk freight",
  description:
    "Sign in with your BulkLoads account and price lanes in seconds. Confidence-scored rate benchmarks and commodity trends built from 14 years of settled bulk freight.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // GA4 (marketing). Gated on the build-time env var so it only loads where
  // NEXT_PUBLIC_GA_ID is set; the value is inlined at build, not read at runtime.
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <head>
        {/*
          The hero's product tour is served from this origin and is the
          slowest thing on the page: the frame has been measured taking four
          and a half seconds just to respond. Opening the connection while the
          rest of the page is still parsing takes the DNS lookup, TCP
          handshake and TLS negotiation off that critical path.

          `preconnect` rather than `prefetch`: the document itself cannot be
          fetched ahead of time, since the iframe asks for it with its own
          credentials and headers. The connection is the part worth having
          ready.
        */}
        <link rel="preconnect" href="https://demo.storylane.com" />
        <link rel="dns-prefetch" href="https://demo.storylane.com" />
      </head>
      <body className="font-sans bg-navy-950 text-navy-50 antialiased">
        {children}
        <Analytics />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <MetaPixel />
      </body>
    </html>
  );
}
