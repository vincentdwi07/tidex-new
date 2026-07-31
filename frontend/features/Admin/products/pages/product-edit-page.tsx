"use client";

import { useProducts } from "@/features/Admin/products/hooks/use-products";
import ProductForm from "@/features/Admin/products/form/product-form";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { PRODUCTS_TITLE } from "@/features/Admin/products/constant/products.constant";
import type { ProductFormValues } from "@/features/Admin/products/schema/product.schema";

export default function ProductEditPage({ id }: { id: string }) {
  const { items, save } = useProducts();
  const item = items.find((p) => p.id === Number(id)) ?? null;

  async function handleSubmit(
    values: ProductFormValues,
    editId: number | null,
  ) {
    await save(values, editId);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Edit Produk"
        breadcrumbs={[
          { label: PRODUCTS_TITLE, href: "/admin/products" },
          { label: item?.nama ?? "Edit Produk" },
        ]}
      />
      {item ? (
        <ProductForm initial={item} onSubmit={handleSubmit} />
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          Memuat data...
        </div>
      )}
    </div>
  );
}
