"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import AdminTable from "@/features/Admin/components/AdminTable";
import { getPartnerColumns } from "./list.schema";
import type { Partner } from "@/lib/api";

interface PartnerListProps {
  items: Partner[];
  onDelete: (id: number) => void;
}

export default function PartnerList({ items, onDelete }: PartnerListProps) {
  const columns = useMemo(() => getPartnerColumns(onDelete), [onDelete]);

  return (
    <AdminTable
      data={items}
      columns={columns}
      searchKeys={["nama"]}
      searchPlaceholder="Cari partner..."
      emptyIcon={<Users className="w-10 h-10" />}
      emptyText="Belum ada partner."
      emptyAction={
        <Link
          href="/admin/partners/new"
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          + Tambah Partner
        </Link>
      }
    />
  );
}
