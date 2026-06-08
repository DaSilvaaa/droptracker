import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DropTracker — O Radar de Saldos de Streetwear",
  description:
    "Previsões comunitárias de saldos para Nude Project, Zara, Corteiz e mais 19 marcas. Nunca mais percas um drop.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://droptracker.com"
  ),
  openGraph: {
    title: "DropTracker — O Radar de Saldos de Streetwear",
    description:
      "Previsões comunitárias de saldos para Nude Project, Zara, Corteiz e mais 19 marcas. Nunca mais percas um drop.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://droptracker.com",
    siteName: "DropTracker",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "DropTracker" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DropTracker — O Radar de Saldos de Streetwear",
    description:
      "Previsões comunitárias de saldos para Nude Project, Zara, Corteiz e mais 19 marcas.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-obsidian antialiased">{children}</body>
    </html>
  );
}
