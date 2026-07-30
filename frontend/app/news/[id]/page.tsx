import { use } from "react";
import type { Metadata } from "next";
import NewsDetail from "@/features/User/news/news-detail";
import { apiFetch, getImageUrl } from "@/lib/api";
import type { ApiResponse, News } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tidex.co.id";

async function getNews(id: number): Promise<News | null> {
  try {
    const res = await apiFetch<ApiResponse<News>>(`/news/${id}`, {
      next: { revalidate: 3600 },
    });
    return res.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const news = await getNews(Number(id));

  if (!news) {
    return {
      title: "Berita Tidak Ditemukan",
      description: "Artikel yang kamu cari tidak tersedia.",
    };
  }

  const imageUrl = getImageUrl(news.imgURL);
  const url = `${SITE_URL}/news/${id}`;

  // Strip HTML tags dari konten untuk description
  const plainText = news.news.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: news.judul,
    description: plainText || `Baca artikel: ${news.judul}`,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: news.judul,
      description: plainText || `Baca artikel: ${news.judul}`,
      publishedTime: news.created_at,
      modifiedTime: news.updated_at ?? news.created_at,
      section: news.kategori,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: news.judul }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: news.judul,
      description: plainText || `Baca artikel: ${news.judul}`,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <>
      {/* JSON-LD NewsArticle structured data — rendered server-side */}
      <NewsStructuredData id={Number(id)} />
      <NewsDetail id={Number(id)} />
    </>
  );
}

async function NewsStructuredData({ id }: { id: number }) {
  const news = await getNews(id);
  if (!news) return null;

  const imageUrl = getImageUrl(news.imgURL);
  const url = `${SITE_URL}/news/${id}`;
  const plainText = news.news.replace(/<[^>]*>/g, "").slice(0, 250);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.judul,
    description: plainText,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: news.created_at,
    dateModified: news.updated_at ?? news.created_at,
    articleSection: news.kategori,
    url,
    publisher: {
      "@type": "Organization",
      name: "PT Titan Persada",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
