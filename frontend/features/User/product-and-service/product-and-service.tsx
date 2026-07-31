"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Cpu, Network, Radio } from "lucide-react";
import { Glassmorph } from "@/lib/constant/Glassmorph";
import BorderGlow from "@/components/BorderGlow";
import {
  getProducts,
  getImageUrl,
  type Product as ApiProduct,
  type ProductPartner,
} from "@/lib/api";

const VALID_TABS = ["infra", "it", "ict", "iot"] as const;
type TabId = (typeof VALID_TABS)[number];

const KATEGORI_MAP: Record<string, TabId> = {
  Infrastructure: "infra",
  IT: "it",
  ICT: "ict",
  IoT: "iot",
};

const categories: {
  id: TabId;
  label: string;
  icon: typeof Server;
  tagline: string;
}[] = [
  {
    id: "infra",
    label: "Infrastructure",
    icon: Server,
    tagline: "Backbone-grade infrastructure engineered for continuity.",
  },
  {
    id: "it",
    label: "Information Technology",
    icon: Cpu,
    tagline: "Software, cloud, and security tailored to enterprise scale.",
  },
  {
    id: "ict",
    label: "Information Communication (ICT)",
    icon: Network,
    tagline: "Unified communications and connectivity for modern teams.",
  },
  {
    id: "iot",
    label: "Internet of Things",
    icon: Radio,
    tagline: "Connected sensing, automation, and intelligence at the edge.",
  },
];

function resolveTab(param: string | null): TabId {
  if (param && VALID_TABS.includes(param as TabId)) return param as TabId;
  return "infra";
}

const Products = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState<TabId>(() =>
    resolveTab(searchParams.get("tab")),
  );
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync active tab when URL param changes (e.g. browser back/forward)
  useEffect(() => {
    setActive(resolveTab(searchParams.get("tab")));
  }, [searchParams]);

  useEffect(() => {
    getProducts(1, 200)
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load data:", err);
        setLoading(false);
      });
  }, []);

  function handleTabChange(tabId: TabId) {
    setActive(tabId);
    router.push(`/product-and-service?tab=${tabId}`, { scroll: false });
  }

  // Group products by tab id
  const grouped = categories.reduce(
    (acc, cat) => {
      const kategoriKey = Object.entries(KATEGORI_MAP).find(
        ([, v]) => v === cat.id,
      )?.[0];
      acc[cat.id] = kategoriKey
        ? products.filter((p) => p.kategori === kategoriKey)
        : [];
      return acc;
    },
    {} as Record<TabId, ApiProduct[]>,
  );

  const current = categories.find((c) => c.id === active)!;
  const activeProducts = grouped[active] ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-white overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24 px-10 xl:px-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.02),transparent_70%)]" />
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-red-500/2 blur-[120px]" />

        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-225 rounded-full blur-3xl opacity-10"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--primary) / 0.55), transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.05]"
          >
            Engineered Solutions <br className="hidden md:block" />
            for the{" "}
            <span className="bg-[linear-gradient(90deg,red,blue)] bg-clip-text text-transparent">
              Connected Enterprise
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-600 font-light md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            A unified portfolio across Infrastructure, IT, ICT, and IoT —
            designed to operate at the standard of a modern, mission-critical
            organization.
          </motion.p>
        </div>
      </section>

      {/* Tabs */}
      <section className="relative bg-white px-10 xl:px-0">
        <div className="max-w-7xl mx-auto">
          <div
            className={`sticky top-17 z-30 ${Glassmorph} rounded-2xl p-1.5 flex gap-1 overflow-x-auto no-scrollbar border border-neutral-200/60`}
          >
            {categories.map((c) => {
              const Icon = c.icon;
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  onClick={() => handleTabChange(c.id)}
                  className={`relative flex grow items-center justify-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? "text-white" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-active"
                      className="absolute inset-0 rounded-xl bg-neutral-900 border border-neutral-800 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className="relative w-4 h-4" />
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="px-10 xl:px-0 bg-white pt-10 md:pt-14 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-neutral-500 py-20 text-sm">
              Loading products...
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-6 md:space-y-8"
              >
                {activeProducts.length === 0 ? (
                  <div className="text-center text-neutral-500 py-16 text-sm">
                    Belum ada produk untuk kategori ini.
                  </div>
                ) : (
                  activeProducts.map((p, i) => (
                    <ProductRow key={p.id} product={p} index={i} />
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  );
};

const ProductRow = ({
  product,
  index,
}: {
  product: ApiProduct;
  index: number;
}) => {
  const reverse = index % 2 === 1;
  const logos: ProductPartner[] = product.partners ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="#ffffff"
        borderRadius={28}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={["red", "purple"]}
      >
        <div
          className={`grid md:grid-cols-2 gap-0 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
        >
          {/* Image */}
          <div className="relative aspect-4/3 overflow-hidden!">
            {product.imgURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={getImageUrl(product.imgURL)}
                alt={product.nama}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1200 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200/50" />
            )}
            <div className="absolute inset-0" />
          </div>

          {/* Content */}
          <div className="relative p-7 md:p-12 flex flex-col justify-between min-h-64 md:min-h-90 min-w-0">
            {/* Top: number + title + desc */}
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-primary/80 mb-4">
                <span className="w-6 h-px bg-primary/60" />0{index + 1}
              </div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 leading-tight mb-4 tracking-tight">
                {product.nama}
              </h3>
              <p className="text-neutral-600 text-sm md:text-[15px] leading-relaxed max-w-xl line-clamp-5">
                {product.deskripsi}
              </p>
            </div>

            {/* Bottom: Trusted Brands */}
            {logos.length > 0 && (
              <div className="mt-7 min-w-0">
                <div className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
                  Trusted Brands
                </div>
                <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2 no-scrollbar -mx-1 px-1">
                  {logos.map((partner) => (
                    <div
                      key={partner.id}
                      className="shrink-0 w-[160px] min-h-[70px] py-3 px-4 rounded-xl bg-neutral-50 border border-neutral-200/60 overflow-hidden flex items-center justify-center shadow-sm"
                      title={partner.nama}
                    >
                      {partner.imgURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={getImageUrl(partner.imgURL)}
                          alt={partner.nama}
                          className="w-[100px] h-[50px] object-contain"
                        />
                      ) : (
                        <span className="text-xs text-neutral-500 text-center px-1 leading-tight">
                          {partner.nama}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </BorderGlow>
    </motion.article>
  );
};

export default Products;
