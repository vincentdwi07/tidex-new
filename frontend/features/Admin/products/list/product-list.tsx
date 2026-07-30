"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import AdminTable from "@/features/Admin/components/AdminTable";
import { getProductColumns } from "./list.schema";
import type { Product } from "@/lib/api";

interface ProductListProps {
  items: Product[];
  onDelete: (id: number) => void;
}

export default function ProductList({ items, onDelete }: ProductListProps) {
  const columns = useMemo(() => getProductColumns(onDelete), [onDelete]);

  return (
    <AdminTable
      data={items}
      columns={columns}
      searchKeys={["nama", "kategori", "deskripsi"]}
      searchPlaceholder="Cari produk..."
      emptyIcon={<Package className="w-10 h-10" />}
      emptyText="Belum ada produk."
      emptyAction={
        <Link
          href="/admin/products/new"
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          + Tambah Produk
        </Link>
      }
    />
  );
}
