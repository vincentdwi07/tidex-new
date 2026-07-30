"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Partner } from "@/lib/api";
import type { PartnerFormValues } from "../schema/partner.schema";
import { defaultPartnerForm } from "../schema/partner.schema";
import ImageUploadWithCrop from "@/features/Admin/components/ImageUploadWithCrop";
import { confirm } from "@/features/Admin/components/ConfirmDialog";

interface PartnerFormProps {
  initial?: Partner | null;
  onSubmit: (values: PartnerFormValues, editId: number | null) => Promise<void>;
}

export default function PartnerForm({ initial, onSubmit }: PartnerFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<PartnerFormValues>({
    nama: initial?.nama ?? defaultPartnerForm.nama,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await confirm({
      title: initial ? "Simpan perubahan?" : "Tambah partner baru?",
      description: initial
        ? "Perubahan data partner akan disimpan."
        : "Data partner baru akan ditambahkan.",
      confirmLabel: initial ? "Simpan" : "Tambah",
    });
    if (!ok) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(values, initial?.id ?? null);
      router.push("/admin/partners");
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

      {/* Logo */}
      <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">Logo Partner</p>
        </div>
        <div className="p-5">
          <ImageUploadWithCrop
            value={initial?.imgURL ?? null}
            onChange={(file) => setValues((v) => ({ ...v, imageFile: file }))}
            aspectRatio={1}
            hint="Rasio 1:1. Format PNG/SVG transparan direkomendasikan. Maks. 2MB."
          />
        </div>
      </div>

      {/* Nama */}
      <div className="bg-white border border-slate-200/80 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <p className="text-sm font-semibold text-slate-900">
            Nama Partner <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="p-5">
          <input
            type="text"
            required
            value={values.nama}
            onChange={(e) => setValues((v) => ({ ...v, nama: e.target.value }))}
            className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
            placeholder="Nama partner"
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
              : "Tambah Partner"}
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
            if (ok) router.push("/admin/partners");
          }}
          className="px-5 py-2.5 rounded-md text-sm text-slate-600 hover:bg-slate-50 border border-slate-200 font-medium transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
