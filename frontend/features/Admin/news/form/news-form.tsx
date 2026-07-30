"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { News } from "@/lib/api";
import type { NewsFormValues } from "../schema/news.schema";
import { defaultNewsForm } from "../schema/news.schema";
import ImageUploadWithCrop from "@/features/Admin/components/ImageUploadWithCrop";
import RichTextEditor from "@/features/Admin/components/RichTextEditor";
import { confirm } from "@/features/Admin/components/ConfirmDialog";

// Split a comma-separated string into trimmed, non-empty tags
function splitTags(str: string): string[] {
  return str
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

interface NewsFormProps {
  initial?: News | null;
  onSubmit: (values: NewsFormValues, editId: number | null) => Promise<void>;
}

export default function NewsForm({ initial, onSubmit }: NewsFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<NewsFormValues>({
    judul: initial?.judul ?? defaultNewsForm.judul,
    kategori: initial?.kategori ?? defaultNewsForm.kategori,
    news: initial?.news ?? defaultNewsForm.news,
  });

  // Internal tag state — derived from values.kategori on init
  const [tags, setTags] = useState<string[]>(() =>
    splitTags(initial?.kategori ?? ""),
  );
  const [tagInput, setTagInput] = useState("");
  const tagInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function syncTags(nextTags: string[]) {
    setTags(nextTags);
    setValues((v) => ({ ...v, kategori: nextTags.join(", ") }));
  }

  function addTag(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    // support pasting comma-separated values at once
    const incoming = trimmed
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const next = [...tags, ...incoming.filter((t) => !tags.includes(t))];
    syncTags(next);
    setTagInput("");
  }

  function removeTag(index: number) {
    syncTags(tags.filter((_, i) => i !== index));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await confirm({
      title: initial ? "Simpan perubahan?" : "Tambah berita baru?",
      description: initial
        ? "Perubahan data berita akan disimpan."
        : "Berita baru akan ditambahkan.",
      confirmLabel: initial ? "Simpan" : "Tambah",
    });
    if (!ok) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(values, initial?.id ?? null);
      router.push("/admin/news");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {/* Gambar Cover */}
      <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">Gambar Cover</p>
        </div>
        <div className="p-5">
          <ImageUploadWithCrop
            value={initial?.imgURL ?? null}
            onChange={(file) => setValues((v) => ({ ...v, imageFile: file }))}
            aspectRatio={16 / 9}
            label=""
            hint="Rasio 16:9. Rekomendasi min. 1280×720px."
          />
        </div>
      </div>

      {/* Kategori — tag input */}
      <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">
            Kategori <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="p-5 flex flex-col gap-2">
          <div
            className="flex flex-wrap gap-1.5 min-h-[42px] w-full bg-white border border-slate-200 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 cursor-text"
            onClick={() => tagInputRef.current?.focus()}
          >
            {tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium px-2 py-0.5 rounded"
              >
                {tag}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(i);
                  }}
                  className="hover:text-blue-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              ref={tagInputRef}
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={() => addTag(tagInput)}
              className="flex-1 min-w-[120px] text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent"
              placeholder={
                tags.length === 0 ? "Ketik lalu tekan koma atau Enter…" : ""
              }
            />
          </div>
          <p className="text-xs text-slate-400">
            Pisahkan dengan koma atau tekan Enter untuk menambah kategori.
          </p>
          <input
            type="text"
            required
            readOnly
            value={values.kategori}
            className="sr-only"
            tabIndex={-1}
          />
        </div>
      </div>

      {/* Judul */}
      <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">
            Judul Berita <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="p-5">
          <input
            type="text"
            required
            value={values.judul}
            onChange={(e) =>
              setValues((v) => ({ ...v, judul: e.target.value }))
            }
            className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
            placeholder="Judul berita"
          />
        </div>
      </div>

      {/* Konten */}
      <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">
            Konten <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="p-5">
          <RichTextEditor
            value={values.news}
            onChange={(html) => setValues((v) => ({ ...v, news: html }))}
            placeholder="Tulis isi berita di sini..."
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
              : "Tambah Berita"}
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
            if (ok) router.push("/admin/news");
          }}
          className="px-5 py-2.5 rounded-md text-sm text-slate-600 hover:bg-slate-50 border border-slate-200 font-medium transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
