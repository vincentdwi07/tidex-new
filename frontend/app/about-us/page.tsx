import AboutUsPage from "@/features/User/about-us/about-us";

import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tidex.co.id";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali PT Titan Persada (Tidex) — technology integrator terpercaya yang menghadirkan solusi infrastruktur, ICT, IT, dan IoT secara end-to-end di seluruh Indonesia.",
  alternates: { canonical: `${SITE_URL}/about-us` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about-us`,
    title: "Tentang Kami | Tidex",
    description:
      "Kenali PT Titan Persada (Tidex) — technology integrator terpercaya yang menghadirkan solusi infrastruktur, ICT, IT, dan IoT di seluruh Indonesia.",
  },
};

export default function AboutUs() {
  return <AboutUsPage />;
}
