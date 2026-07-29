"use client";

import { useState } from "react";
import type { Product } from "@/lib/api";
import { KATEGORI_OPTIONS } from "../constant/products.constant";
import type { ProductFormValues } from "../schema/product.schema";
import { defaultProductForm } from "../schema/product.schema";

interface ProductFormProps {
  initial?: Product | null;
  onSubmit: (values: ProductFormValues, editId: number | null) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({
  initial,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>({
    nama: initial?.nama ?? defaultProductForm.nama,
    deskripsi: initial?.deskripsi ?? defaultProductForm.deskripsi,
    kategori: initial?.kategori ?? defaultProductForm.kategori,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(values, initial?.id ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 font-medium">Nama Produk</label>
        <input
          type="text"
          required
          value={values.nama}
          onChange={(e) => setValues((v) => ({ ...v, nama: e.target.value }))}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="Nama produk"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 font-medium">Deskripsi</label>
        <textarea
          required
          rows={4}
          value={values.deskripsi}
          onChange={(e) =>
            setValues((v) => ({ ...v, deskripsi: e.target.value }))
          }
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Deskripsi produk"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 font-medium">Kategori</label>
        <select
          required
          value={values.kategori}
          onChange={(e) =>
            setValues((v) => ({ ...v, kategori: e.target.value }))
          }
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">Pilih kategori</option>
          {KATEGORI_OPTIONS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 font-medium">Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setValues((v) => ({ ...v, imageFile: e.target.files?.[0] }))
          }
          className="text-sm text-gray-400 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-gray-700 file:text-white file:text-sm file:cursor-pointer"
        />
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50"
        >
          {submitting
            ? "Menyimpan..."
            : initial
              ? "Simpan Perubahan"
              : "Tambah Produk"}
        </button>
      </div>
    </form>
  );
}
