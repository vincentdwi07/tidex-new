"use client";

import { Package, Users, Briefcase, Newspaper, Mail } from "lucide-react";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { useDashboard } from "./hooks/use-dashboard";
import VisitorChart from "../components/DashboardChart";

const STAT_CONFIG = [
  {
    key: "unread_messages" as const,
    label: "Pesan Belum Dibaca",
    icon: Mail,
    accent: "text-red-600",
    tint: "bg-red-50",
    border: "border-l-red-500",
  },
  {
    key: "products" as const,
    label: "Produk & Layanan",
    icon: Package,
    accent: "text-blue-600",
    tint: "bg-blue-50",
    border: "border-l-blue-500",
  },
  {
    key: "partners" as const,
    label: "Partner",
    icon: Users,
    accent: "text-emerald-600",
    tint: "bg-emerald-50",
    border: "border-l-emerald-500",
  },
  {
    key: "projects" as const,
    label: "Proyek",
    icon: Briefcase,
    accent: "text-violet-600",
    tint: "bg-violet-50",
    border: "border-l-violet-500",
  },
  {
    key: "news" as const,
    label: "Berita",
    icon: Newspaper,
    accent: "text-amber-600",
    tint: "bg-amber-50",
    border: "border-l-amber-500",
  },
];

export default function DashboardPage() {
  const { stats, loading, visitorData } = useDashboard();

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Dashboard"
        description="Ringkasan data dan statistik website"
      />

      {loading ? (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 md:row-span-2 bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-28 mb-4" />
            <div className="h-9 bg-slate-200 rounded w-20" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="col-span-12 md:col-span-3 bg-white border border-slate-200 rounded-xl p-6 animate-pulse"
            >
              <div className="h-4 bg-slate-200 rounded w-24 mb-4" />
              <div className="h-9 bg-slate-200 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {STAT_CONFIG.map(
            ({ key, label, icon: Icon, accent, tint, border }) => {
              const isUnreadMessages = key === "unread_messages";
              return (
                <div
                  key={key}
                  className={`${
                    isUnreadMessages
                      ? "col-span-12 md:col-span-6 md:row-span-2"
                      : "col-span-12 md:col-span-3"
                  } group bg-white border border-slate-200 border-l-4 ${border} rounded-xl p-6 flex flex-col justify-between transition-shadow hover:shadow-md`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-slate-500 font-medium">
                      {label}
                    </p>
                    <div className={`${tint} p-2 rounded-lg`}>
                      <Icon
                        className={`${isUnreadMessages ? "w-5 h-5" : "w-4 h-4"} ${accent}`}
                      />
                    </div>
                  </div>
                  <p
                    className={`${
                      isUnreadMessages ? "text-5xl" : "text-3xl"
                    } font-bold text-slate-900 tracking-tight`}
                  >
                    {stats?.[key] ?? 0}
                  </p>
                </div>
              );
            },
          )}
        </div>
      )}

      <VisitorChart data={visitorData} loading={loading} />
    </div>
  );
}
