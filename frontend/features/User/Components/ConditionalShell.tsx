"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/features/User/Components/Navbar";
import FooterSection from "@/features/User/Components/Footer/Footer";

export default function ConditionalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FooterSection />
    </>
  );
}
