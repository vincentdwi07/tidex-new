"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/api";
import { KATEGORI_OPTIONS } from "../constant/products.constant";
import type { ProductFormValues } from "../schema/product.schema";
import { defaultProductForm } from "../schema/product.schema";
import ImageUploadWithCrop from "@/features/Admin/components/ImageUploadWithCrop";
import { confirm } from "@/features/Admin/components/ConfirmDialog";
import MultiLogoSelect from "@/features/Admin/components/MultiLogoSelect";
import { usePartners } from "@/features/Admin/partners/hooks/use-partners";

interface ProductFormProps {
  initial?: Product | null;
  onSubmit: (values: ProductFormValues, editId: number | null) => Promise<void>;
}

export default function ProductForm({ initial, onSubmit }: ProductFormProps) {
  const router = useRouter();
  const { items: partners, loading: partnersLoading } = usePartners();
  const [values, setValues] = useState<ProductFormValues>({
    nama: initial?.nama ?? defaultProductForm.nama,
    deskripsi: initial?.deskripsi ?? defaultProductForm.deskripsi,
    kategori: initial?.kategori ?? defaultProductForm.kategori,
    logos: initial?.logos ?? defaultProductForm.logos,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.logos || values.logos.trim() === "") {
      setError("Pilih minimal 1 logo partner.");
      return;
    }
    const ok = await confirm({
      title: initial ? "Simpan perubahan?" : "Tambah produk baru?",
      description: initial
        ? "Perubahan data produk akan disimpan."
        : "Data produk baru akan ditambahkan.",
      confirmLabel: initial ? "Simpan" : "Tambah",
    });
    if (!ok) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(values, initial?.id ?? null);
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="flex items-center gap-2.5 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      {/* Gambar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">Gambar Produk</p>
        </div>
        <div className="p-5">
          <ImageUploadWithCrop
            value={initial?.imgURL ?? null}
            onChange={(file) => setValues((v) => ({ ...v, imageFile: file }))}
            aspectRatio={4 / 3}
            label=""
            hint="Rasio 4:3. Rekomendasi min. 800×600px."
          />
        </div>
      </div>

      {/* Nama */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">
            Nama Produk <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="p-5">
          <input
            type="text"
            required
            value={values.nama}
            onChange={(e) => setValues((v) => ({ ...v, nama: e.target.value }))}
            className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
            placeholder="Nama produk"
          />
        </div>
      </div>

      {/* Kategori */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">
            Kategori <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="p-5">
          <select
            required
            value={values.kategori}
            onChange={(e) =>
              setValues((v) => ({ ...v, kategori: e.target.value }))
            }
            className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
          >
            {KATEGORI_OPTIONS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Logos */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">
            Logo Partner <span className="text-red-500">*</span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Pilih logo partner yang terkait dengan produk ini
          </p>
        </div>
        <div className="p-5">
          <MultiLogoSelect
            partners={partners}
            value={values.logos}
            onChange={(v) => setValues((prev) => ({ ...prev, logos: v }))}
            loading={partnersLoading}
          />
        </div>
      </div>

      {/* Deskripsi */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">
            Deskripsi <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="p-5">
          <textarea
            required
            rows={5}
            value={values.deskripsi}
            onChange={(e) =>
              setValues((v) => ({ ...v, deskripsi: e.target.value }))
            }
            className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
            placeholder="Deskripsi produk"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 px-5 py-2.5 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting
            ? "Menyimpan..."
            : initial
              ? "Simpan Perubahan"
              : "Tambah Produk"}
        </button>
        <button
          type="button"
          onClick={async () => {
            const ok = await confirm({
              title: "Batalkan perubahan?",
              description: "Data yang belum disimpan akan hilang.",
              confirmLabel: "Ya, batalkan",
              cancelLabel: "Kembali",
              variant: "warning",
            });
            if (ok) router.push("/admin/products");
          }}
          className="px-5 py-2.5 rounded-md text-sm text-slate-600 hover:bg-slate-50 border border-slate-200 font-medium transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
