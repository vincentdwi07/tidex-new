"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag as TagIcon } from "lucide-react";
import { getNewsById, getImageUrl, type News } from "@/lib/api";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsDetail({ id }: { id: number }) {
  const [item, setItem] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getNewsById(id)
      .then((res) => {
        if (res.data) setItem(res.data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen">
        <div className="max-w-3xl mx-auto px-6 md:px-10 xl:px-0 pt-28 md:pt-36 pb-24 animate-pulse space-y-6">
          <div className="h-3 w-32 rounded bg-white/5" />
          <div className="h-8 w-3/4 rounded-lg bg-white/5" />
          <div className="h-8 w-2/3 rounded-lg bg-white/5" />
          <div className="h-5 w-40 rounded bg-white/5" />
          <div className="aspect-video rounded-2xl bg-white/5 mt-4" />
          <div className="space-y-3 mt-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-white/5"
                style={{ width: `${85 + (i % 3) * 5}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-white/40 text-sm">Article not found.</p>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Newsroom
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <article className="max-w-3xl mx-auto px-6 md:px-10 xl:px-0 pt-28 md:pt-36 pb-24">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Newsroom
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8"
        >
          {/* Meta */}
          <div className="flex items-center flex-wrap gap-3 mb-5">
            {item.kategori &&
              item.kategori
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
            <span className="text-xs text-white/40 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {formatDate(item.created_at)}
            </span>
            {item.updated_at && item.updated_at !== item.created_at && (
              <span className="text-xs text-white/30">
                · Updated {formatDate(item.updated_at)}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-semibold text-white leading-tight tracking-tight">
            {item.judul}
          </h1>
        </motion.header>

        {/* Cover image */}
        {item.imgURL && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(item.imgURL)}
              alt={item.judul}
              className="w-full aspect-video object-cover rounded-2xl bg-white/5"
            />
          </motion.div>
        )}

        {/* Divider */}
        <div className="border-t border-white/10 mb-10" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="prose-news"
          dangerouslySetInnerHTML={{ __html: item.news }}
        />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All News
          </Link>
          <span className="text-xs text-white/30">
            {formatDate(item.created_at)}
          </span>
        </div>
      </article>
    </div>
  );
}
