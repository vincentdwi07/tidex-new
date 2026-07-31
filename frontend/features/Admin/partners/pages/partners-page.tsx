"use client";

import Link from "next/link";
import { usePartners } from "@/features/Admin/partners/hooks/use-partners";
import PartnerList from "@/features/Admin/partners/list/partner-list";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import TableSkeleton from "@/features/Admin/components/TableSkeleton";

export default function PartnersPage() {
  const { items, loading, remove } = usePartners();

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Partner"
        description="Kelola daftar mitra dan partner bisnis perusahaan."
        action={
          <Link
            href="/admin/partners/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            <span className="text-base leading-none">+</span>
            Tambah Partner
          </Link>
        }
      />

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <PartnerList items={items} onDelete={remove} />
      )}
    </div>
  );
}
