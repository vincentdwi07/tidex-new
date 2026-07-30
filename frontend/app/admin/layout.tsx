"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { logout } from "@/lib/api";
import { Toaster } from "sonner";
import { ConfirmDialogProvider } from "@/features/Admin/components/ConfirmDialog";

const NAV_ITEMS = [
  {
    label: "Produk & Layanan",
    href: "/admin/products",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
        />
      </svg>
    ),
  },
  {
    label: "Partner",
    href: "/admin/partners",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
        />
      </svg>
    ),
  },
  {
    label: "Proyek",
    href: "/admin/projects",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
        />
      </svg>
    ),
  },
  {
    label: "Berita",
    href: "/admin/news",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
  },
];

const NAV_BOTTOM = {
  label: "Pesan",
  href: "/admin/messages",
  icon: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
};

function NavItem({
  item,
  pathname,
}: {
  item: { label: string; href: string; icon: React.ReactNode };
  pathname: string;
}) {
  const active = pathname.startsWith(item.href);
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-150 ${
        active
          ? "bg-blue-500 text-white font-semibold"
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
      }`}
    >
      <span className={active ? "text-white" : "text-slate-500"}>
        {item.icon}
      </span>
      {item.label}
    </Link>
  );
}

function getInitials(email: string) {
  const name = email.split("@")[0];
  return name.slice(0, 2).toUpperCase();
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, isLoading, clearAuth } = useAuth();

  useEffect(() => {
    if (!isLoading && !token && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isLoading, token, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) return null;
  if (!token) return null;

  async function handleLogout() {
    if (token) {
      try {
        await logout(token);
      } catch {
        // ignore
      }
    }
    clearAuth();
    router.replace("/admin/login");
  }

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar — fixed kiri, full height */}
      <aside className="w-60 shrink-0 bg-slate-900 flex flex-col fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-slate-600 flex items-center">
          <h1 className="font-bold text-white text-base tracking-tight">
            Admin Tidex
          </h1>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}
          <div className="my-2 border-t border-slate-600" />
          <NavItem item={NAV_BOTTOM} pathname={pathname} />
        </nav>
      </aside>

      {/* Right side: topbar + scrollable content */}
      <div className="flex-1 min-w-0 flex flex-col ml-60">
        {/* Top bar */}
        <header className="h-14 shrink-0 bg-white border-b border-slate-200 flex items-center justify-end px-6 gap-3 sticky top-0 z-20">
          {user && (
            <>
              {/* Avatar */}
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {getInitials(user.email)}
              </div>
              {/* Email */}
              <span className="text-sm text-slate-600 truncate max-w-[200px]">
                {user.email}
              </span>
              {/* Divider */}
              <div className="w-px h-4 bg-slate-200" />
            </>
          )}
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Keluar
          </button>
        </header>

        {/* Main content — scrollable */}
        <main className="flex-1 p-7 overflow-y-auto">{children}</main>
      </div>

      {/* Global overlays */}
      <Toaster position="bottom-right" closeButton={false} richColors={false} />
      <ConfirmDialogProvider />
    </div>
  );
}
