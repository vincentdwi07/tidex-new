import { Suspense } from "react";
import Products from "@/features/User/product-and-service/product-and-service";

function ProductPageSkeleton() {
  return (
    <div className="bg-black min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-10 xl:px-0">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="h-7 w-40 rounded-full bg-white/5" />
          </div>
          {/* Title */}
          <div className="space-y-3 flex flex-col items-center">
            <div className="h-12 md:h-16 w-3/4 max-w-xl rounded-xl bg-white/5" />
            <div className="h-12 md:h-16 w-1/2 max-w-sm rounded-xl bg-white/5" />
          </div>
          {/* Subtitle */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-4 w-2/3 max-w-md rounded bg-white/5" />
            <div className="h-4 w-1/2 max-w-xs rounded bg-white/5" />
          </div>
        </div>
      </section>

      {/* Tabs skeleton */}
      <section className="px-10 xl:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl bg-white/5 p-1.5 flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-1 h-10 rounded-xl bg-white/5" />
            ))}
          </div>
        </div>
      </section>

      {/* Cards skeleton */}
      <section className="px-10 xl:px-0 pt-10 md:pt-14 pb-24">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden border border-white/5"
            >
              <div className="grid md:grid-cols-2">
                {/* Image placeholder */}
                <div className="aspect-4/3 md:aspect-auto md:min-h-90 bg-white/5" />
                {/* Content placeholder */}
                <div className="p-7 md:p-12 flex flex-col justify-between min-h-64 md:min-h-90">
                  <div className="space-y-4">
                    <div className="h-3 w-16 rounded bg-white/5" />
                    <div className="h-8 w-3/4 rounded-lg bg-white/5" />
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-white/5" />
                      <div className="h-4 w-5/6 rounded bg-white/5" />
                      <div className="h-4 w-4/6 rounded bg-white/5" />
                    </div>
                  </div>
                  <div className="mt-7 space-y-3">
                    <div className="h-3 w-24 rounded bg-white/5" />
                    <div className="flex gap-2">
                      {[...Array(4)].map((_, j) => (
                        <div
                          key={j}
                          className="w-10 h-10 rounded-lg bg-white/5"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Product() {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <Products />
    </Suspense>
  );
}
