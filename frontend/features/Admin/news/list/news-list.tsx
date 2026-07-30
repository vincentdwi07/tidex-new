"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import AdminTable from "@/features/Admin/components/AdminTable";
import { getNewsColumns } from "./list.schema";
import type { News } from "@/lib/api";

interface NewsListProps {
  items: News[];
  onDelete: (id: number) => void;
}

export default function NewsList({ items, onDelete }: NewsListProps) {
  const columns = useMemo(() => getNewsColumns(onDelete), [onDelete]);

  return (
    <AdminTable
      data={items}
      columns={columns}
      searchKeys={["judul", "kategori"]}
      searchPlaceholder="Cari berita..."
      emptyIcon={<Newspaper className="w-10 h-10" />}
      emptyText="Belum ada berita."
      emptyAction={
        <Link
          href="/admin/news/new"
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          + Tambah Berita
        </Link>
      }
    />
  );
}
