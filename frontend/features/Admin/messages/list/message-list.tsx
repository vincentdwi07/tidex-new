"use client";

import { useMemo } from "react";
import { Mail } from "lucide-react";
import AdminTable from "@/features/Admin/components/AdminTable";
import { getMessageColumns } from "./list.schema";
import type { Message } from "@/lib/api";

interface MessageListProps {
  items: Message[];
  onDelete: (id: number) => void;
}

export default function MessageList({ items, onDelete }: MessageListProps) {
  const columns = useMemo(() => getMessageColumns(onDelete), [onDelete]);

  return (
    <AdminTable
      data={items}
      columns={columns}
      searchKeys={["nama", "email", "pesan"]}
      searchPlaceholder="Cari pesan..."
      emptyIcon={<Mail className="w-10 h-10" />}
      emptyText="Belum ada pesan masuk."
    />
  );
}
