"use client";

import Link from "next/link";
import { useProducts } from "@/features/Admin/products/hooks/use-products";
import ProductList from "@/features/Admin/products/list/product-list";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import TableSkeleton from "@/features/Admin/components/TableSkeleton";
import { PRODUCTS_TITLE } from "@/features/Admin/products/constant/products.constant";

export default function ProductsPage() {
  const { items, loading, remove } = useProducts();

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={PRODUCTS_TITLE}
        description="Kelola produk dan layanan yang ditampilkan di website."
        action={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            <span className="text-base leading-none">+</span>
            Tambah Produk
          </Link>
        }
      />

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <ProductList items={items} onDelete={remove} />
      )}
    </div>
  );
}
