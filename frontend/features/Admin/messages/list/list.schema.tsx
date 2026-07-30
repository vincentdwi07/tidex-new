"use client";

import { Trash2, Eye } from "lucide-react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import type { Message } from "@/lib/api";
import { confirm } from "@/features/Admin/components/ConfirmDialog";

function DeleteCell({
  item,
  onDelete,
}: {
  item: Message;
  onDelete: (id: number) => void;
}) {
  async function handleDelete() {
    const ok = await confirm({
      title: "Hapus Pesan?",
      description: `Pesan dari "${item.nama}" akan dihapus secara permanen.`,
      confirmLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "danger",
    });
    if (ok) onDelete(item.id);
  }

  return (
    <button
      onClick={handleDelete}
      title="Hapus"
      className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

export function getMessageColumns(
  onDelete: (id: number) => void,
): ColumnDef<Message, unknown>[] {
  return [
    {
      accessorKey: "nama",
      header: "Nama",
      cell: ({ row }) => (
        <div>
          <span className="text-gray-900 font-medium text-sm block">
            {row.original.nama}
          </span>
          <span className="text-blue-600 text-xs">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "pesan",
      header: "Pesan",
      cell: ({ getValue }) => {
        const pesan = getValue() as string;
        const truncated =
          pesan.length > 150 ? pesan.slice(0, 150) + "..." : pesan;
        return (
          <span className="text-gray-600 text-sm max-w-md block" title={pesan}>
            {truncated}
          </span>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) =>
        row.original.isNew ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600 border border-red-200">
            Belum Dibaca
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
            Sudah Dibaca
          </span>
        ),
    },
    {
      accessorKey: "created_at",
      header: "Tanggal",
      cell: ({ getValue }) => (
        <span className="text-gray-400 text-xs">
          {new Date(getValue() as string).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/messages/${row.original.id}`}
            title="Lihat Detail"
            className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <DeleteCell item={row.original} onDelete={onDelete} />
        </div>
      ),
    },
  ];
}
