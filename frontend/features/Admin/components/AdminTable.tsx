"use client";

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

interface AdminTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  emptyIcon?: React.ReactNode;
  emptyText?: string;
  emptyAction?: React.ReactNode;
  searchPlaceholder?: string;
  searchKeys?: (keyof TData)[];
}

export default function AdminTable<TData extends object>({
  data,
  columns,
  emptyIcon,
  emptyText = "Belum ada data.",
  emptyAction,
  searchPlaceholder = "Cari...",
  searchKeys,
}: AdminTableProps<TData>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!searchKeys || searchKeys.length === 0 || !query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((key) => {
        const val = row[key];
        return typeof val === "string" && val.toLowerCase().includes(q);
      }),
    );
  }, [data, query, searchKeys]);

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Search bar */}
      {searchKeys && searchKeys.length > 0 && (
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-md shadow-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
        </div>
      )}

      {/* Table card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-slate-100">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-50/60 last:text-right"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-50">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-5 py-20 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      {query ? (
                        <>
                          <Search className="w-10 h-10 text-slate-200" />
                          <p className="text-sm text-slate-400">
                            Tidak ada hasil untuk &quot;{query}&quot;
                          </p>
                        </>
                      ) : (
                        <>
                          {emptyIcon && (
                            <span className="text-slate-200">{emptyIcon}</span>
                          )}
                          <p className="text-sm text-slate-400">{emptyText}</p>
                          {emptyAction && <div>{emptyAction}</div>}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-5 py-3.5 text-slate-700 last:text-right"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
