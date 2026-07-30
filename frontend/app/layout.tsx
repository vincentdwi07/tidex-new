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

export const metadata: Metadata = {
  title: "Tidex - Engineering Solutions",
  description: "Engineered solutions for the connected enterprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#000" }}>
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
