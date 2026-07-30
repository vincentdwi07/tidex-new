"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  action?: React.ReactNode;
  stats?: { label: string; value: string | number }[];
}

export default function AdminPageHeader({
  title,
  description,
  breadcrumbs,
  action,
  stats,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-5">
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-slate-400">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-blue-500 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-500">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-slate-500">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      {/* Stats row */}
      {stats && stats.length > 0 && (
        <div className="flex items-center gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 leading-tight">
                {stat.label}
              </span>
              {i < stats.length - 1 && (
                <div className="w-px h-5 bg-slate-200 ml-3" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
