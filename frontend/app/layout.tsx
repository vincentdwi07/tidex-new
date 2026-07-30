import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import ConditionalShell from "@/features/User/Components/ConditionalShell";
import VisitorTracker from "@/features/User/Components/VisitorTracker";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tidex.co.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tidex | PT Titan Persada — Solusi Teknologi Enterprise",
    template: "%s | Tidex",
  },
  description:
    "PT Titan Persada (Tidex) — penyedia solusi teknologi terintegrasi meliputi infrastruktur, ICT, IT, dan IoT untuk enterprise di seluruh Indonesia.",
  keywords: [
    "Tidex",
    "PT Titan Persada",
    "solusi teknologi",
    "infrastruktur IT",
    "IoT",
    "ICT",
    "enterprise Indonesia",
    "technology integrator",
  ],
  authors: [{ name: "PT Titan Persada", url: SITE_URL }],
  creator: "PT Titan Persada",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Tidex — PT Titan Persada",
    title: "Tidex | PT Titan Persada — Solusi Teknologi Enterprise",
    description:
      "PT Titan Persada (Tidex) — penyedia solusi teknologi terintegrasi meliputi infrastruktur, ICT, IT, dan IoT untuk enterprise di seluruh Indonesia.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tidex — PT Titan Persada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tidex | PT Titan Persada — Solusi Teknologi Enterprise",
    description:
      "PT Titan Persada (Tidex) — penyedia solusi teknologi terintegrasi meliputi infrastruktur, ICT, IT, dan IoT untuk enterprise di seluruh Indonesia.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" style={{ backgroundColor: "#000" }}>
      <body
        className={`${poppins.className} antialiased`}
        style={{ backgroundColor: "#000" }}
      >
        <AuthProvider>
          <VisitorTracker />
          <ConditionalShell>{children}</ConditionalShell>
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
