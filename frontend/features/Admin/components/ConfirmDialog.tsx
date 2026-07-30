"use client";

import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
}

interface ConfirmState extends ConfirmOptions {
  resolve: (value: boolean) => void;
}

let openConfirmDialog: ((opts: ConfirmOptions) => Promise<boolean>) | null =
  null;

export function confirm(opts: ConfirmOptions): Promise<boolean> {
  if (!openConfirmDialog) return Promise.resolve(false);
  return openConfirmDialog(opts);
}

export function ConfirmDialogProvider() {
  const [state, setState] = useState<ConfirmState | null>(null);

  useEffect(() => {
    openConfirmDialog = (opts) => {
      return new Promise<boolean>((resolve) => {
        setState({ ...opts, resolve });
      });
    };
    return () => {
      openConfirmDialog = null;
    };
  }, []);

  if (!state) return null;

  function handleConfirm() {
    state?.resolve(true);
    setState(null);
  }

  function handleCancel() {
    state?.resolve(false);
    setState(null);
  }

  const isDanger = state.variant === "danger";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top accent bar */}
        <div
          className={`h-1 w-full ${isDanger ? "bg-red-500" : "bg-amber-400"}`}
        />

        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                isDanger ? "bg-red-50" : "bg-amber-50"
              }`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${isDanger ? "text-red-500" : "text-amber-500"}`}
              />
            </div>
            <div className="flex flex-col gap-1 pt-0.5">
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {state.title}
              </p>
              {state.description && (
                <p className="text-sm text-slate-500 leading-relaxed">
                  {state.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2.5 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              {state.cancelLabel ?? "Batal"}
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md transition-all active:scale-95 ${
                isDanger
                  ? "bg-red-600 hover:bg-red-700 shadow-red-600/20"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
              }`}
            >
              {state.confirmLabel ?? "Konfirmasi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
