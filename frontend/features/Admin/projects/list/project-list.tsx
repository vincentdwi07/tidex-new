"use client";

import Image from "next/image";
import type { Project } from "@/lib/api";

interface ProjectListProps {
  items: Project[];
  onEdit: (item: Project) => void;
  onDelete: (id: number) => void;
}

export default function ProjectList({
  items,
  onEdit,
  onDelete,
}: ProjectListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 text-sm">
        Belum ada proyek. Tambah proyek pertama.
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
              Perusahaan
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
              <td className="px-4 py-3 text-gray-300">{item.company_name}</td>
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
