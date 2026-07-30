"use client";

import { usePartners } from "@/features/Admin/partners/hooks/use-partners";
import PartnerForm from "@/features/Admin/partners/form/partner-form";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { PARTNERS_TITLE } from "@/features/Admin/partners/constant/partners.constant";
import type { PartnerFormValues } from "@/features/Admin/partners/schema/partner.schema";

export default function AdminPartnerNewPage() {
  const { save } = usePartners();

  async function handleSubmit(
    values: PartnerFormValues,
    editId: number | null,
  ) {
    await save(values, editId);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Tambah Partner"
        breadcrumbs={[
          { label: PARTNERS_TITLE, href: "/admin/partners" },
          { label: "Tambah Partner" },
        ]}
      />
      <PartnerForm onSubmit={handleSubmit} />
    </div>
  );
}
