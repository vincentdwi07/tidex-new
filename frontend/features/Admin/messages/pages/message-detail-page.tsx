"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { useMessages } from "@/features/Admin/messages/hooks/use-messages";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { markMessageAsRead } from "@/lib/api";

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessageDetailPage({ id }: { id: string }) {
  const { items, loading, reload } = useMessages();
  const item = items.find((m) => m.id === Number(id)) ?? null;
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if (!item || !item.isNew || marked) return;
    markMessageAsRead(Number(id))
      .then(() => {
        setMarked(true);
        reload();
      })
      .catch(() => {});
  }, [item, id, marked, reload]);

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Detail Pesan"
        breadcrumbs={[
          { label: "Pesan", href: "/admin/messages" },
          { label: item?.nama ?? "Detail" },
        ]}
        action={
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        }
      />

      {loading && !item ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          Memuat data...
        </div>
      ) : !item ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          Pesan tidak ditemukan.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <p className="text-sm font-semibold text-slate-900">Pengirim</p>
              {item.isNew && !marked ? (
                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600 border border-red-200">
                  Belum Dibaca
                </span>
              ) : (
                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                  Sudah Dibaca
                </span>
              )}
            </div>
            <div className="px-5 py-4 flex flex-col gap-3">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Nama</p>
                <p className="text-sm text-slate-800 font-medium">
                  {item.nama}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Email</p>
                <a
                  href={`mailto:${item.email}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {item.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Dikirim pada</p>
                <p className="text-sm text-slate-700">
                  {formatDate(item.created_at)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">Pesan</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {item.pesan}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <a
              href={`mailto:${item.email}?subject=Re: Pesan dari ${item.nama}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              Balas via Email
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
