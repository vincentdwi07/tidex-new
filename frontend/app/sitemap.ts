import type { MetadataRoute } from "next";
import { apiFetch } from "@/lib/api";
import type { PaginatedResponse, News } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tidex.co.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/product-and-service`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamic news pages
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const res = await apiFetch<PaginatedResponse<News>>("/news?limit=1000", {
      next: { revalidate: 3600 },
    });
    newsPages = res.data.map((article) => ({
      url: `${SITE_URL}/news/${article.id}`,
      lastModified: new Date(article.updated_at ?? article.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Jika API tidak tersedia saat build, sitemap tetap generate untuk static pages
  }

  return [...staticPages, ...newsPages];
}
