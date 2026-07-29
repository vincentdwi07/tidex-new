"use client";

import { useState } from "react";
import { usePartners } from "@/features/Admin/partners/hooks/use-partners";
import PartnerList from "@/features/Admin/partners/list/partner-list";
import PartnerForm from "@/features/Admin/partners/form/partner-form";
import { PARTNERS_TITLE } from "@/features/Admin/partners/constant/partners.constant";
import type { Partner } from "@/lib/api";
import type { PartnerFormValues } from "@/features/Admin/partners/schema/partner.schema";

export default function AdminPartnersPage() {
  const { items, loading, error, save, remove } = usePartners();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Partner | null>(null);

  function openCreate() {
    setEditItem(null);
    setShowForm(true);
  }

  function openEdit(item: Partner) {
    setEditItem(item);
    setShowForm(true);
  }

  async function handleSubmit(
    values: PartnerFormValues,
    editId: number | null,
  ) {
    await save(values, editId);
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">{PARTNERS_TITLE}</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          + Tambah
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-medium text-white mb-4">
            {editItem ? "Edit Partner" : "Tambah Partner"}
          </h2>
          <PartnerForm
            initial={editItem}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          Memuat data...
        </div>
      ) : (
        <PartnerList items={items} onEdit={openEdit} onDelete={remove} />
      )}
    </div>
  );
}
