"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { getImageUrl } from "@/lib/api/client";
import type { Partner } from "@/lib/api";

interface MultiLogoSelectProps {
  partners: Partner[];
  value: string; // comma-separated partner IDs
  onChange: (value: string) => void;
  loading?: boolean;
}

export default function MultiLogoSelect({
  partners,
  value,
  onChange,
  loading,
}: MultiLogoSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse comma-separated IDs to number array
  const selectedIds: number[] = value
    ? value
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n))
    : [];

  const selectedPartners = selectedIds
    .map((id) => partners.find((p) => p.id === id))
    .filter(Boolean) as Partner[];

  const filteredPartners = partners.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase()),
  );

  function toggle(id: number) {
    const exists = selectedIds.includes(id);
    const next = exists
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    onChange(next.join(","));
  }

  function remove(id: number) {
    const next = selectedIds.filter((i) => i !== id);
    onChange(next.join(","));
  }

  // Calculate dropdown position relative to trigger
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 320; // approx max height

    if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
      // Open upward
      setDropdownStyle({
        position: "fixed",
        bottom: window.innerHeight - rect.top + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    } else {
      // Open downward
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, []);

  function handleOpen() {
    updatePosition();
    setOpen((o) => !o);
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      )
        return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  const dropdown = open ? (
    <div
      ref={dropdownRef}
      style={dropdownStyle}
      className="bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
    >
      {/* Search */}
      <div className="p-2 border-b border-slate-100">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari partner..."
          className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
          autoFocus
        />
      </div>

      {/* List */}
      <div className="max-h-60 overflow-y-auto py-1">
        {loading ? (
          <div className="px-4 py-3 text-sm text-slate-400 text-center">
            Memuat...
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="px-4 py-3 text-sm text-slate-400 text-center">
            Tidak ada partner ditemukan
          </div>
        ) : (
          filteredPartners.map((p) => {
            const selected = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(p.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 transition-colors ${
                  selected ? "bg-blue-50" : ""
                }`}
              >
                {/* Logo preview */}
                <div className="w-10 h-10 rounded border border-slate-200 bg-white overflow-hidden shrink-0 flex items-center justify-center">
                  {p.imgURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={getImageUrl(p.imgURL)}
                      alt={p.nama}
                      className="w-9 h-9 object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400 text-center leading-tight px-0.5">
                      {p.nama.slice(0, 3)}
                    </span>
                  )}
                </div>

                {/* Name */}
                <span
                  className={`flex-1 text-sm text-left ${selected ? "text-blue-700 font-medium" : "text-slate-700"}`}
                >
                  {p.nama}
                </span>

                {/* Checkmark */}
                {selected && (
                  <svg
                    className="w-4 h-4 text-blue-500 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  ) : null;

  return (
    <div className="relative">
      {/* Selected preview chips */}
      {selectedPartners.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {selectedPartners.map((p) => (
            <div
              key={p.id}
              className="flex flex-col items-center gap-1 w-20 group"
            >
              <div className="relative w-16 h-16 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
                {p.imgURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getImageUrl(p.imgURL)}
                    alt={p.nama}
                    className="w-14 h-14 object-contain p-1"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs text-center px-1">
                    {p.nama}
                  </div>
                )}
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  title="Hapus"
                >
                  ×
                </button>
              </div>
              <span className="text-[10px] text-slate-600 text-center leading-tight line-clamp-2 w-full">
                {p.nama}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
      >
        <span className="text-slate-400">
          {loading
            ? "Memuat partner..."
            : selectedPartners.length === 0
              ? "Pilih logo partner..."
              : `${selectedPartners.length} partner dipilih`}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown rendered via portal to escape overflow:hidden */}
      {typeof window !== "undefined" && createPortal(dropdown, document.body)}
    </div>
  );
}
