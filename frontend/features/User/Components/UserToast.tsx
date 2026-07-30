"use client";

import { toast } from "sonner";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface ToastContentProps {
  title: string;
  description?: string;
  type: "success" | "error";
  toastId: string | number;
}

function ToastContent({
  title,
  description,
  type,
  toastId,
}: ToastContentProps) {
  const isSuccess = type === "success";

  return (
    <div className="flex items-start gap-3 w-full">
      {/* icon */}
      <div
        className={`shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center ${
          isSuccess ? "bg-green-500/15" : "bg-red-500/15"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-4 h-4 text-green-400" />
        ) : (
          <XCircle className="w-4 h-4 text-red-400" />
        )}
      </div>

      {/* text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white leading-snug">{title}</p>
        {description && (
          <p className="text-xs text-white/50 mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>

      {/* close */}
      <button
        onClick={() => toast.dismiss(toastId)}
        className="shrink-0 p-1 rounded-lg hover:bg-white/10 text-white/30 hover:text-white/60 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export const userToast = {
  success(title: string, description?: string) {
    const id = Math.random().toString(36).slice(2);
    toast.custom(
      (t) => (
        <div className="w-[340px] bg-[#0f0f0f] border border-green-500/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 py-3.5 flex">
          <ToastContent
            title={title}
            description={description}
            type="success"
            toastId={t}
          />
        </div>
      ),
      { id, duration: 4500 },
    );
  },

  error(title: string, description?: string) {
    const id = Math.random().toString(36).slice(2);
    toast.custom(
      (t) => (
        <div className="w-[340px] bg-[#0f0f0f] border border-red-500/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 py-3.5 flex">
          <ToastContent
            title={title}
            description={description}
            type="error"
            toastId={t}
          />
        </div>
      ),
      { id, duration: 5000 },
    );
  },
};
