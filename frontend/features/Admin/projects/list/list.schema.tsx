"use client";

import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Project } from "@/lib/api";
import { confirm } from "@/features/Admin/components/ConfirmDialog";
import { getImageUrl } from "@/lib/api/client";

function ActionCell({
  item,
  onDelete,
}: {
  item: Project;
  onDelete: (id: number) => void;
}) {
  const router = useRouter();

  async function handleDelete() {
    const ok = await confirm({
      title: "Hapus Proyek?",
      description: `Proyek "${item.nama}" akan dihapus secara permanen.`,
      confirmLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "danger",
    });
    if (ok) onDelete(item.id);
  }

  return (
    <div className="flex gap-1 justify-end">
      <button
        onClick={() => router.push(`/admin/projects/${item.id}`)}
        title="Detail"
        className="p-1.5 rounded-md text-gray-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={() => router.push(`/admin/projects/${item.id}/edit`)}
        title="Edit"
        className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Pencil className="w-4 h-4" />
      </button>
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

export function getProjectColumns(
  onDelete: (id: number) => void,
): ColumnDef<Project, unknown>[] {
  return [
    {
      accessorKey: "imgURL",
      header: "Gambar",
      cell: ({ row }) =>
        row.original.imgURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImageUrl(row.original.imgURL)}
            alt={row.original.nama}
            className="w-12 h-12 object-cover rounded-md border border-gray-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
            –
          </div>
        ),
    },
    {
      accessorKey: "nama",
      header: "Nama",
      cell: ({ row, getValue }) => (
        <button
          onClick={() =>
            row.original.id &&
            (window.location.href = `/admin/projects/${row.original.id}`)
          }
          className="text-slate-900 font-medium text-sm hover:text-blue-600 transition-colors text-left"
        >
          {getValue() as string}
        </button>
      ),
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => <ActionCell item={row.original} onDelete={onDelete} />,
    },
  ];
}
