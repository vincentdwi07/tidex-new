"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { getNews, getImageUrl, type News } from "@/lib/api";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-1">
      {label}
    </span>
  );
}

function CategoryPills({ kategori }: { kategori: string }) {
  const tags = kategori
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return (
    <>
      {tags.map((tag, i) => (
        <CategoryBadge key={i} label={tag} />
      ))}
    </>
  );
}

function NewsCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-3">
      <div className="aspect-video rounded-xl bg-neutral-100" />
      <div className="h-3 w-20 rounded bg-neutral-100" />
      <div className="h-5 w-full rounded bg-neutral-100" />
      <div className="h-5 w-4/5 rounded bg-neutral-100" />
      <div className="h-4 w-24 rounded bg-neutral-100 mt-1" />
    </div>
  );
}

const NewsPage = () => {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews(1, 50, false)
      .then((res) => setItems(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featured = items[0] ?? null;
  const rest = items.slice(1);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-6 md:px-10 xl:px-0">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-3">
              Newsroom
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tight leading-tight">
              News &amp; Updates
            </h1>
            <p className="text-neutral-500 mt-3 text-sm md:text-base max-w-xl leading-relaxed">
              Announcements, updates, and notes from Tidex operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-0">
        <div className="border-t border-neutral-200" />
      </div>

      {/* Content */}
      <section className="pt-10 md:pt-14 pb-24 px-6 md:px-10 xl:px-0">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-24 text-neutral-400 text-sm">
              No articles available yet.
            </div>
          ) : (
            <div className="space-y-12 md:space-y-16">
              {/* Featured — first article, larger */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href={`/news/${featured.id}`}
                    className="group grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-100">
                      {featured.imgURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={getImageUrl(featured.imgURL)}
                          alt={featured.judul}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200/50" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        {featured.kategori && (
                          <CategoryPills kategori={featured.kategori} />
                        )}
                        <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {formatDate(featured.created_at)}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 leading-tight tracking-tight group-hover:text-red-500 transition-colors">
                        {featured.judul}
                      </h2>
                      <div
                        className="text-neutral-600 text-sm leading-relaxed line-clamp-3 rich-text-content-preview"
                        dangerouslySetInnerHTML={{
                          __html: featured.news.replace(/<[^>]+>/g, " ").trim(),
                        }}
                      />
                      <span className="inline-flex items-center gap-2 text-sm text-red-500 font-medium group-hover:gap-3 transition-all">
                        Read more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Rest — grid */}
              {rest.length > 0 && (
                <>
                  <div className="border-t border-neutral-200" />
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {rest.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                      >
                        <Link
                          href={`/news/${item.id}`}
                          className="group flex flex-col gap-4"
                        >
                          {/* Thumbnail */}
                          <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-100">
                            {item.imgURL ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={getImageUrl(item.imgURL)}
                                alt={item.judul}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200/50" />
                            )}
                          </div>

                          {/* Meta */}
                          <div className="flex items-center gap-2.5 flex-wrap">
                            {item.kategori && (
                              <CategoryPills kategori={item.kategori} />
                            )}
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(item.created_at)}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base md:text-lg font-semibold text-neutral-900 leading-snug tracking-tight group-hover:text-red-500 transition-colors line-clamp-2">
                            {item.judul}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                            {item.news.replace(/<[^>]+>/g, " ").trim()}
                          </p>

                          <span className="inline-flex items-center gap-1.5 text-xs text-red-500 font-medium group-hover:gap-2.5 transition-all">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
