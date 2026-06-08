import type { MetadataRoute } from "next";
import { BRAND_SLUGS } from "@/lib/brands-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://droptracker.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  ];

  const brandRoutes: MetadataRoute.Sitemap = BRAND_SLUGS.map((slug) => ({
    url: `${BASE}/brands/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...brandRoutes];
}
