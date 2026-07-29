"use client";

import { useState } from "react";
import { useProducts } from "@/features/Admin/products/hooks/use-products";
import ProductList from "@/features/Admin/products/list/product-list";
import ProductForm from "@/features/Admin/products/form/product-form";
import { PRODUCTS_TITLE } from "@/features/Admin/products/constant/products.constant";
import type { Product } from "@/lib/api";
import type { ProductFormValues } from "@/features/Admin/products/schema/product.schema";

export default function AdminProductsPage() {
  const { items, loading, error, save, remove } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);

  function openCreate() {
    setEditItem(null);
    setShowForm(true);
  }

  function openEdit(item: Product) {
    setEditItem(item);
    setShowForm(true);
  }

  async function handleSubmit(
    values: ProductFormValues,
    editId: number | null,
  ) {
    await save(values, editId);
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">{PRODUCTS_TITLE}</h1>
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
            {editItem ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <ProductForm
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
        <ProductList items={items} onEdit={openEdit} onDelete={remove} />
      )}
    </div>
  );
}
