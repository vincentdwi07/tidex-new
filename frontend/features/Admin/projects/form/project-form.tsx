"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/api";
import type { ProjectFormValues } from "../schema/project.schema";
import { defaultProjectForm } from "../schema/project.schema";
import ImageUploadWithCrop from "@/features/Admin/components/ImageUploadWithCrop";
import { confirm } from "@/features/Admin/components/ConfirmDialog";

interface ProjectFormProps {
  initial?: Project | null;
  onSubmit: (values: ProjectFormValues, editId: number | null) => Promise<void>;
}

export default function ProjectForm({ initial, onSubmit }: ProjectFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ProjectFormValues>({
    nama: initial?.nama ?? defaultProjectForm.nama,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await confirm({
      title: initial ? "Simpan perubahan?" : "Tambah proyek baru?",
      description: initial
        ? "Perubahan data proyek akan disimpan."
        : "Data proyek baru akan ditambahkan.",
      confirmLabel: initial ? "Simpan" : "Tambah",
    });
    if (!ok) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(values, initial?.id ?? null);
      router.push("/admin/projects");
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

      {/* Gambar */}
      <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">Gambar Proyek</p>
        </div>
        <div className="p-5">
          <ImageUploadWithCrop
            value={initial?.imgURL ?? null}
            onChange={(file) => setValues((v) => ({ ...v, imageFile: file }))}
            aspectRatio={16 / 9}
            hint="Rasio 16:9. Rekomendasi min. 1280×720px. Maks. 2MB."
          />
        </div>
      </div>

      {/* Nama */}
      <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">
            Nama Proyek <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="p-5">
          <input
            type="text"
            required
            value={values.nama}
            onChange={(e) => setValues((v) => ({ ...v, nama: e.target.value }))}
            className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
            placeholder="Nama proyek"
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
              : "Tambah Proyek"}
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
            if (ok) router.push("/admin/projects");
          }}
          className="px-5 py-2.5 rounded-md text-sm text-slate-600 hover:bg-slate-50 border border-slate-200 font-medium transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
