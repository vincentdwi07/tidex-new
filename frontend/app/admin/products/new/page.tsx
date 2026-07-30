"use client";

import { useProducts } from "@/features/Admin/products/hooks/use-products";
import ProductForm from "@/features/Admin/products/form/product-form";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { PRODUCTS_TITLE } from "@/features/Admin/products/constant/products.constant";
import type { ProductFormValues } from "@/features/Admin/products/schema/product.schema";

export default function AdminProductNewPage() {
  const { save } = useProducts();

  async function handleSubmit(
    values: ProductFormValues,
    editId: number | null,
  ) {
    await save(values, editId);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Tambah Produk"
        breadcrumbs={[
          { label: PRODUCTS_TITLE, href: "/admin/products" },
          { label: "Tambah Produk" },
        ]}
      />
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
