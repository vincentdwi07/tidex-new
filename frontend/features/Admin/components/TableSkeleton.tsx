"use client";

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export default function TableSkeleton({
  rows = 5,
  cols = 4,
}: TableSkeletonProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200/80 overflow-hidden">
      {/* Header skeleton */}
      <div className="border-b border-slate-100 bg-slate-50/60 px-5 py-3.5 flex gap-8">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className={`h-3 rounded-full bg-slate-200 animate-pulse ${
              i === 0 ? "w-32" : i === cols - 1 ? "w-16 ml-auto" : "w-24"
            }`}
          />
        ))}
      </div>

      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="border-b border-slate-50 last:border-0 px-5 py-4 flex items-center gap-8"
        >
          {Array.from({ length: cols }).map((_, colIdx) => (
            <div
              key={colIdx}
              className={`h-4 rounded-full animate-pulse ${
                colIdx === 0
                  ? "w-40 bg-slate-200"
                  : colIdx === cols - 1
                    ? "w-20 ml-auto bg-slate-100"
                    : "bg-slate-100 " + (colIdx % 2 === 0 ? "w-28" : "w-20")
              }`}
              style={{ animationDelay: `${rowIdx * 50}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
