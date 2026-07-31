"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { usePartners } from "@/features/Admin/partners/hooks/use-partners";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { getImageUrl } from "@/lib/api/client";

export default function PartnerDetailPage({ id }: { id: string }) {
  const { items, loading } = usePartners();
  const item = items.find((p) => p.id === Number(id)) ?? null;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={item?.nama ?? "Detail Partner"}
        breadcrumbs={[
          { label: "Partner", href: "/admin/partners" },
          { label: item?.nama ?? "Detail" },
        ]}
        action={
          <Link
            href={`/admin/partners/${id}/edit`}
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
                <p className="text-sm font-semibold text-slate-900">Logo</p>
              </div>
              <div className="p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(item.imgURL)}
                  alt={item.nama}
                  className="w-32 h-32 object-contain rounded-md bg-slate-100 p-2 border border-slate-200"
                />
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">
                Nama Partner
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
