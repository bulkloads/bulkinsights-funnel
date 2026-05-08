import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Book a Demo — Bulk Insights",
  description:
    "Book a 30-minute demo and we'll pull up real market data for the lanes, commodities, and carriers that matter to your business.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-navy-950 text-navy-50 antialiased">{children}</body>
    </html>
  );
}
