import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: `${BRAND.tagline} | ${BRAND.name}`,
  description: "Grain is an offer researcher for founders and operators. It investigates your market and produces a falsifiable thesis — who to build for, what mechanism to lead with, and the three findings that would change the verdict. Not a framework. A verdict.",
  keywords: ["offer design", "offer engineering", "market research", "market sophistication", "positioning", "ICM", "Interpretable Context Methodology", "EDUBA", "Cleaf Notes"],
  authors: [{ name: "griffainai" }],
  openGraph: { type: "website", url: BRAND.siteUrl, title: `${BRAND.tagline} | ${BRAND.name}`, description: "An offer researcher. Not a framework. A verdict.", siteName: BRAND.name },
  twitter: { card: "summary_large_image", title: `${BRAND.tagline} | ${BRAND.name}` },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-ink">{children}</body>
    </html>
  );
}
