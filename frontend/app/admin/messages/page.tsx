"use client";

import { useMessages } from "@/features/Admin/messages/hooks/use-messages";
import MessageList from "@/features/Admin/messages/list/message-list";
import { MESSAGES_TITLE } from "@/features/Admin/messages/constant/messages.constant";

export default function AdminMessagesPage() {
  const { items, loading, error, remove } = useMessages();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">{MESSAGES_TITLE}</h1>
        <span className="text-sm text-gray-500">{items.length} pesan</span>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          Memuat data...
        </div>
      ) : (
        <MessageList items={items} onDelete={remove} />
      )}
    </div>
  );
}
