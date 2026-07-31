import type { Metadata } from "next";
import HomePage from "@/features/User/home/home-page";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tidex.co.id";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  return <HomePage />;
}
