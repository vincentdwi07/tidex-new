import type { Metadata } from "next";
import News from "@/features/User/news/news-page";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tidex.co.id";

export const metadata: Metadata = {
  title: "Berita & Artikel",
  description:
    "Baca berita terbaru, artikel teknologi, dan update dari PT Titan Persada (Tidex) — solusi infrastruktur, ICT, IT, dan IoT untuk enterprise Indonesia.",
  alternates: { canonical: `${SITE_URL}/news` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/news`,
    title: "Berita & Artikel | Tidex",
    description:
      "Baca berita terbaru, artikel teknologi, dan update dari PT Titan Persada (Tidex).",
  },
};

export default function New() {
  return <News />;
}
