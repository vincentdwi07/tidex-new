"use client";

import { useState } from "react";
import type { Project } from "@/lib/api";
import type { ProjectFormValues } from "../schema/project.schema";
import { defaultProjectForm } from "../schema/project.schema";

interface ProjectFormProps {
  initial?: Project | null;
  onSubmit: (values: ProjectFormValues, editId: number | null) => Promise<void>;
  onCancel: () => void;
}

export default function ProjectForm({
  initial,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>({
    nama: initial?.nama ?? defaultProjectForm.nama,
    deskripsi: initial?.deskripsi ?? defaultProjectForm.deskripsi,
    company_name: initial?.company_name ?? defaultProjectForm.company_name,
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
        <label className="text-xs text-gray-400 font-medium">Nama Proyek</label>
        <input
          type="text"
          required
          value={values.nama}
          onChange={(e) => setValues((v) => ({ ...v, nama: e.target.value }))}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="Nama proyek"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 font-medium">
          Nama Perusahaan
        </label>
        <input
          type="text"
          required
          value={values.company_name}
          onChange={(e) =>
            setValues((v) => ({ ...v, company_name: e.target.value }))
          }
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="Nama perusahaan klien"
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
          placeholder="Deskripsi proyek"
        />
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
              : "Tambah Proyek"}
        </button>
      </div>
    </form>
  );
}
