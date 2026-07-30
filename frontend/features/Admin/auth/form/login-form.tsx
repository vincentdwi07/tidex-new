"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/use-login";
import { useAuth } from "@/lib/auth-context";
import type { LoginFormValues } from "../schema/login.schema";
import { defaultLoginForm } from "../schema/login.schema";

export default function LoginForm() {
  const router = useRouter();
  const { token } = useAuth();
  const { submit, loading, error } = useLogin();
  const [values, setValues] = useState<LoginFormValues>(defaultLoginForm);

  useEffect(() => {
    if (token) {
      router.replace("/admin");
    }
  }, [token, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit(values);
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[380px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.webp"
            alt="Tidex"
            width={120}
            height={40}
            className="h-9 w-auto object-contain mb-6"
          />
          <p className="text-sm text-slate-500">Panel administrasi Tidex</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]"
        >
          {error && (
            <div className="flex items-center gap-2.5 text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <svg
                className="w-4 h-4 shrink-0 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-700 font-medium">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              className="bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="admin@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700 font-medium">
                Password
              </label>
            </div>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={values.password}
              onChange={(e) =>
                setValues((v) => ({ ...v, password: e.target.value }))
              }
              className="bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Masuk...
              </span>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Butuh bantuan? Hubungi administrator sistem
        </p>
      </div>
    </div>
  );
}
