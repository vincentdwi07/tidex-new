"use client";

import { toast } from "sonner";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";

interface ToastContentProps {
  title: string;
  description?: string;
  type: "success" | "error" | "info" | "warning";
  toastId: string | number;
}

function ToastContent({
  title,
  description,
  type,
  toastId,
}: ToastContentProps) {
  const icons = {
    success: (
      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
    ),
    error: <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
    warning: (
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
    ),
  };

  return (
    <div className="flex items-start gap-3 w-full pr-1">
      {icons[type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-snug">
          {title}
        </p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => toast.dismiss(toastId)}
        className="shrink-0 p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// Helper to create styled toasts with title + optional description
export const adminToast = {
  success(title: string, description?: string) {
    const id = Math.random().toString(36).slice(2);
    toast.custom(
      (t) => (
        <div className="w-[340px] bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3.5 flex">
          <ToastContent
            title={title}
            description={description}
            type="success"
            toastId={t}
          />
        </div>
      ),
      { id, duration: 4000 },
    );
  },

  error(title: string, description?: string) {
    const id = Math.random().toString(36).slice(2);
    toast.custom(
      (t) => (
        <div className="w-[340px] bg-white border border-red-100 rounded-xl shadow-lg px-4 py-3.5 flex">
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

  info(title: string, description?: string) {
    const id = Math.random().toString(36).slice(2);
    toast.custom(
      (t) => (
        <div className="w-[340px] bg-white border border-blue-100 rounded-xl shadow-lg px-4 py-3.5 flex">
          <ToastContent
            title={title}
            description={description}
            type="info"
            toastId={t}
          />
        </div>
      ),
      { id, duration: 4000 },
    );
  },

  warning(title: string, description?: string) {
    const id = Math.random().toString(36).slice(2);
    toast.custom(
      (t) => (
        <div className="w-[340px] bg-white border border-amber-100 rounded-xl shadow-lg px-4 py-3.5 flex">
          <ToastContent
            title={title}
            description={description}
            type="warning"
            toastId={t}
          />
        </div>
      ),
      { id, duration: 4000 },
    );
  },
};
