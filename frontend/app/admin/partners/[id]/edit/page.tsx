"use client";

import { use } from "react";
import { usePartners } from "@/features/Admin/partners/hooks/use-partners";
import PartnerForm from "@/features/Admin/partners/form/partner-form";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { PARTNERS_TITLE } from "@/features/Admin/partners/constant/partners.constant";
import type { PartnerFormValues } from "@/features/Admin/partners/schema/partner.schema";

export default function AdminPartnerEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { items, save } = usePartners();

  const item = items.find((p) => p.id === Number(id)) ?? null;

  async function handleSubmit(
    values: PartnerFormValues,
    editId: number | null,
  ) {
    await save(values, editId);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Edit Partner"
        breadcrumbs={[
          { label: PARTNERS_TITLE, href: "/admin/partners" },
          { label: item?.nama ?? "Edit Partner" },
        ]}
      />
      {item ? (
        <PartnerForm initial={item} onSubmit={handleSubmit} />
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          Memuat data...
        </div>
      )}
    </div>
  );
}
