"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const MENU_CARDS = [
  {
    label: "Produk & Layanan",
    href: "/admin/products",
    desc: "Kelola daftar produk dan layanan",
  },
  {
    label: "Partner",
    href: "/admin/partners",
    desc: "Kelola data partner perusahaan",
  },
  {
    label: "Proyek",
    href: "/admin/projects",
    desc: "Kelola portofolio proyek",
  },
  {
    label: "Berita",
    href: "/admin/news",
    desc: "Tulis dan publikasikan berita",
  },
  {
    label: "Pesan Masuk",
    href: "/admin/messages",
    desc: "Lihat pesan dari pengunjung",
  },
];

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Selamat datang{user ? `, ${user.name}` : ""}
        </h1>
        <p className="text-gray-500 text-sm mt-1">Panel administrasi Tidex</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MENU_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-gray-800 bg-gray-900/40 p-6 hover:border-blue-500/40 hover:bg-gray-800/40 transition-all"
          >
            <p className="text-white font-semibold text-base group-hover:text-blue-400 transition-colors">
              {card.label}
            </p>
            <p className="text-gray-500 text-sm mt-1">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
