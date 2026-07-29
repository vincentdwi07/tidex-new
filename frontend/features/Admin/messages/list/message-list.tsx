"use client";

import type { Message } from "@/lib/api";

interface MessageListProps {
  items: Message[];
  onDelete: (id: number) => void;
}

export default function MessageList({ items, onDelete }: MessageListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 text-sm">
        Belum ada pesan masuk.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 flex flex-col gap-2"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white font-medium text-sm">{item.nama}</p>
              <p className="text-blue-400 text-xs">{item.email}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-gray-600 text-xs">
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={() => onDelete(item.id)}
                className="px-3 py-1.5 rounded-lg text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed border-t border-gray-800/60 pt-3">
            {item.pesan}
          </p>
        </div>
      ))}
    </div>
  );
}
