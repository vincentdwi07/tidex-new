"use client";

import Image from "next/image";
import type { Partner } from "@/lib/api";

interface PartnerListProps {
  items: Partner[];
  onEdit: (item: Partner) => void;
  onDelete: (id: number) => void;
}

export default function PartnerList({
  items,
  onEdit,
  onDelete,
}: PartnerListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 text-sm">
        Belum ada partner. Tambah partner pertama.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/50">
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Logo
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Nama
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Website
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
                    className="w-12 h-12 object-contain rounded-lg bg-white/5 p-1"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-600 text-xs">
                    No img
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-white font-medium">{item.nama}</td>
              <td className="px-4 py-3">
                {item.website_url ? (
                  <a
                    href={item.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-xs"
                  >
                    {item.website_url}
                  </a>
                ) : (
                  <span className="text-gray-600 text-xs">—</span>
                )}
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
