"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { logout } from "@/lib/api";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Produk & Layanan", href: "/admin/products" },
  { label: "Partner", href: "/admin/partners" },
  { label: "Proyek", href: "/admin/projects" },
  { label: "Berita", href: "/admin/news" },
  { label: "Pesan", href: "/admin/messages" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, isLoading, clearAuth } = useAuth();

  // Redirect to login if not authenticated (client-side guard)
  useEffect(() => {
    if (!isLoading && !token && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isLoading, token, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Wait for auth hydration before making any decisions
  if (isLoading) {
    return null;
  }

  // Not authenticated after hydration — useEffect will redirect
  if (!token) {
    return null;
  }

  async function handleLogout() {
    if (token) {
      try {
        await logout(token);
      } catch {
        // ignore logout errors
      }
    }
    clearAuth();
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-gray-800 flex flex-col">
        <div className="px-5 py-5 border-b border-gray-800">
          <span className="text-white font-bold text-base tracking-tight">
            Tidex Admin
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-800">
          {user && (
            <p className="text-gray-500 text-xs px-3 mb-2 truncate">
              {user.email}
            </p>
          )}
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
          >
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  );
}
