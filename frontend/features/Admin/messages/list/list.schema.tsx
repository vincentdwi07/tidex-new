"use client";

import { Trash2 } from "lucide-react";
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
    <div className="flex justify-end">
      <button
        onClick={handleDelete}
        title="Hapus"
        className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
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
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-medium text-sm">
              {row.original.nama}
            </span>
            {row.original.isNew && (
              <span className="px-1.5 py-0.5 rounded text-xs bg-blue-50 text-blue-600 border border-blue-100">
                Baru
              </span>
            )}
          </div>
          <span className="text-blue-600 text-xs">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "pesan",
      header: "Pesan",
      cell: ({ getValue }) => (
        <span className="text-gray-600 text-sm max-w-md truncate block">
          {getValue() as string}
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
      cell: ({ row }) => <DeleteCell item={row.original} onDelete={onDelete} />,
    },
  ];
}
