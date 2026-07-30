"use client";

import { useMessages } from "@/features/Admin/messages/hooks/use-messages";
import MessageList from "@/features/Admin/messages/list/message-list";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import TableSkeleton from "@/features/Admin/components/TableSkeleton";

export default function AdminMessagesPage() {
  const { items, loading, remove } = useMessages();

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Pesan Masuk"
        description="Pesan dari pengunjung website yang membutuhkan tindak lanjut."
      />

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <MessageList items={items} onDelete={remove} />
      )}
    </div>
  );
}
