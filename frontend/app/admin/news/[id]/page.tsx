"use client";

import { use } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { useNews } from "@/features/Admin/news/hooks/use-news";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { getImageUrl } from "@/lib/api/client";

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminNewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { items, loading } = useNews();
  const item = items.find((n) => n.id === Number(id)) ?? null;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={item?.judul ?? "Detail Berita"}
        breadcrumbs={[
          { label: "Berita", href: "/admin/news" },
          { label: item?.judul ?? "Detail" },
        ]}
        action={
          <Link
            href={`/admin/news/${id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
        }
      />

      {loading && !item ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          Memuat data...
        </div>
      ) : !item ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          Data tidak ditemukan.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Cover */}
          {item.imgURL && (
            <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
                <p className="text-sm font-semibold text-slate-900">
                  Gambar Cover
                </p>
              </div>
              <div className="p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(item.imgURL)}
                  alt={item.judul}
                  className="w-full max-w-2xl aspect-video object-cover rounded-md bg-slate-100 border border-slate-200"
                />
              </div>
            </div>
          )}

          {/* Judul */}
          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">Judul</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-slate-800 font-medium">{item.judul}</p>
            </div>
          </div>

          {/* Kategori */}
          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">Kategori</p>
            </div>
            <div className="px-5 py-4 flex flex-wrap gap-1.5">
              {item.kategori
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean)
                .map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>

          {/* Tanggal */}
          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">Tanggal</p>
            </div>
            <div className="px-5 py-4 flex gap-8">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Dibuat</p>
                <p className="text-sm text-slate-700">
                  {formatDate(item.created_at)}
                </p>
              </div>
              {item.updated_at && (
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Diperbarui</p>
                  <p className="text-sm text-slate-700">
                    {formatDate(item.updated_at)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Konten */}
          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">Konten</p>
            </div>
            <div
              className="px-5 py-4 rich-text-content text-slate-700"
              dangerouslySetInnerHTML={{ __html: item.news }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
