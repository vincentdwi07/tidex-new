"use client";

import { useState } from "react";
import type { News } from "@/lib/api";
import type { NewsFormValues } from "../schema/news.schema";
import { defaultNewsForm } from "../schema/news.schema";

interface NewsFormProps {
  initial?: News | null;
  onSubmit: (values: NewsFormValues, editId: number | null) => Promise<void>;
  onCancel: () => void;
}

export default function NewsForm({
  initial,
  onSubmit,
  onCancel,
}: NewsFormProps) {
  const [values, setValues] = useState<NewsFormValues>({
    judul: initial?.judul ?? defaultNewsForm.judul,
    konten: initial?.konten ?? defaultNewsForm.konten,
    is_published: initial?.is_published ?? defaultNewsForm.is_published,
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
        <label className="text-xs text-gray-400 font-medium">Judul</label>
        <input
          type="text"
          required
          value={values.judul}
          onChange={(e) => setValues((v) => ({ ...v, judul: e.target.value }))}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="Judul berita"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 font-medium">Konten</label>
        <textarea
          required
          rows={8}
          value={values.konten}
          onChange={(e) => setValues((v) => ({ ...v, konten: e.target.value }))}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Isi konten berita..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 font-medium">
          Gambar Cover
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setValues((v) => ({ ...v, imageFile: e.target.files?.[0] }))
          }
          className="text-sm text-gray-400 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-gray-700 file:text-white file:text-sm file:cursor-pointer"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={values.is_published}
            onChange={(e) =>
              setValues((v) => ({ ...v, is_published: e.target.checked }))
            }
          />
          <div
            className={`w-10 h-5 rounded-full transition-colors ${
              values.is_published ? "bg-blue-600" : "bg-gray-700"
            }`}
          />
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
              values.is_published ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
        <span className="text-sm text-gray-300">Publikasikan</span>
      </label>

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
              : "Tambah Berita"}
        </button>
      </div>
    </form>
  );
}
