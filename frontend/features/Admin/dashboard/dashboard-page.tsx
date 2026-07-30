"use client";

import { Package, Users, Briefcase, Newspaper, Mail } from "lucide-react";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { useDashboard } from "./hooks/use-dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const STAT_CONFIG = [
  {
    key: "products" as const,
    label: "Produk & Layanan",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    key: "partners" as const,
    label: "Partner",
    icon: Users,
    color: "bg-green-500",
  },
  {
    key: "projects" as const,
    label: "Proyek",
    icon: Briefcase,
    color: "bg-purple-500",
  },
  {
    key: "news" as const,
    label: "Berita",
    icon: Newspaper,
    color: "bg-orange-500",
  },
  {
    key: "unread_messages" as const,
    label: "Pesan Belum Dibaca",
    icon: Mail,
    color: "bg-red-500",
  },
];

export default function DashboardPage() {
  const { stats, visitorData, loading } = useDashboard();

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Dashboard"
        description="Ringkasan data dan statistik website"
      />

      {/* Stat Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-lg p-5 animate-pulse"
            >
              <div className="h-4 bg-slate-200 rounded w-24 mb-3" />
              <div className="h-8 bg-slate-200 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {STAT_CONFIG.map(({ key, label, icon: Icon, color }) => (
            <div
              key={key}
              className="bg-white border border-slate-200/80 rounded-lg shadow-sm p-5 flex items-start gap-4"
            >
              <div className={`${color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">
                  {label}
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats?.[key] ?? 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visitor Chart */}
      <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
          <h2 className="text-lg font-semibold text-slate-900">
            Pengunjung Website (30 Hari Terakhir)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Unique visitors per hari berdasarkan IP address
          </p>
        </div>
        <div className="p-5">
          {loading ? (
            <div className="h-80 flex items-center justify-center text-slate-400 text-sm">
              Memuat data...
            </div>
          ) : visitorData.every((d) => d.count === 0) ? (
            <div className="h-80 flex items-center justify-center text-slate-400 text-sm">
              Belum ada data pengunjung
            </div>
          ) : (
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="date"
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(val: string) => {
                      const d = new Date(val);
                      return `${d.getDate()}/${d.getMonth() + 1}`;
                    }}
                  />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                    labelFormatter={(val) => {
                      const d = new Date(val as string);
                      return d.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });
                    }}
                    formatter={(value: number) => [value, "Pengunjung"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
