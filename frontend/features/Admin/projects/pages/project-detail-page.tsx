"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { useProjects } from "@/features/Admin/projects/hooks/use-projects";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { getImageUrl } from "@/lib/api/client";

export default function ProjectDetailPage({ id }: { id: string }) {
  const { items, loading } = useProjects();
  const item = items.find((p) => p.id === Number(id)) ?? null;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={item?.nama ?? "Detail Proyek"}
        breadcrumbs={[
          { label: "Proyek", href: "/admin/projects" },
          { label: item?.nama ?? "Detail" },
        ]}
        action={
          <Link
            href={`/admin/projects/${id}/edit`}
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
          {item.imgURL && (
            <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
                <p className="text-sm font-semibold text-slate-900">
                  Gambar Proyek
                </p>
              </div>
              <div className="p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(item.imgURL)}
                  alt={item.nama}
                  className="w-full max-w-lg aspect-square object-cover rounded-md bg-slate-100 border border-slate-200"
                />
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">
                Nama Proyek
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-slate-800">{item.nama}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
