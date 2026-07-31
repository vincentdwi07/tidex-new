"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { getProductById } from "@/lib/api";
import type { Product } from "@/lib/api";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { getImageUrl } from "@/lib/api/client";
import { PRODUCTS_TITLE } from "@/features/Admin/products/constant/products.constant";

export default function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(Number(id))
      .then((res) => setItem(res.data))
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Use partners directly from API response (already joined)
  const logoPartners = item?.partners ?? [];

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={item?.nama ?? "Detail Produk"}
        breadcrumbs={[
          { label: PRODUCTS_TITLE, href: "/admin/products" },
          { label: item?.nama ?? "Detail" },
        ]}
        action={
          <Link
            href={`/admin/products/${id}/edit`}
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
          {/* Gambar */}
          {item.imgURL && (
            <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
                <p className="text-sm font-semibold text-slate-900">Gambar</p>
              </div>
              <div className="p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(item.imgURL)}
                  alt={item.nama}
                  className="w-full max-w-lg aspect-video object-cover rounded-md bg-slate-100 border border-slate-200"
                />
              </div>
            </div>
          )}

          {/* Nama */}
          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">
                Nama Produk
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-slate-800">{item.nama}</p>
            </div>
          </div>

          {/* Kategori */}
          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">Kategori</p>
            </div>
            <div className="px-5 py-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {item.kategori}
              </span>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
              <p className="text-sm font-semibold text-slate-900">Deskripsi</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {item.deskripsi || (
                  <span className="text-slate-400 italic">
                    Tidak ada deskripsi
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Logos */}
          {logoPartners.length > 0 && (
            <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
                <p className="text-sm font-semibold text-slate-900">
                  Logo Partner ({logoPartners.length})
                </p>
              </div>
              <div className="px-5 py-4">
                <div className="flex flex-wrap gap-4">
                  {logoPartners.map((p) => (
                    <div
                      key={p!.id}
                      className="flex flex-col items-center gap-1.5 w-20"
                    >
                      <div className="w-16 h-16 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
                        {p!.imgURL ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={getImageUrl(p!.imgURL)}
                            alt={p!.nama}
                            className="w-14 h-14 object-contain p-1"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-400 text-center px-1">
                            {p!.nama}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-600 text-center leading-tight line-clamp-2 w-full">
                        {p!.nama}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
