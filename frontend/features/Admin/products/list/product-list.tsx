"use client";

import Image from "next/image";
import type { Product } from "@/lib/api";

interface ProductListProps {
  items: Product[];
  onEdit: (item: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductList({
  items,
  onEdit,
  onDelete,
}: ProductListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 text-sm">
        Belum ada produk. Tambah produk pertama.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/50">
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Gambar
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Nama
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Kategori
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Deskripsi
            </th>
            <th className="text-right px-4 py-3 text-gray-400 font-medium">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
            >
              <td className="px-4 py-3">
                {item.imgURL ? (
                  <Image
                    src={item.imgURL}
                    alt={item.nama}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-600 text-xs">
                    No img
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-white font-medium">{item.nama}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                  {item.kategori}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-400 max-w-xs truncate">
                {item.deskripsi}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onEdit(item)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
