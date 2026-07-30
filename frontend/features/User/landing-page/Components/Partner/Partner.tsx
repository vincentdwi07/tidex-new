"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading";
import Image from "next/image";
import { getPartners, getImageUrl, type Partner } from "@/lib/api";
// eslint-disable-next-line @next/next/no-img-element

const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartners(1, 100)
      .then((res) => {
        setPartners(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load partners:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="section-padding relative overflow-hidden py-[100px] bg-black">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative z-10 mx-auto">
          <SectionHeading
            subtitle="Our Partners"
            title="Trusted by Industry Leaders"
          />
          <div className="text-center text-white/50 py-12">
            Loading partners...
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return (
      <section className="section-padding relative overflow-hidden py-[100px] bg-black">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative z-10 mx-auto">
          <SectionHeading
            subtitle="Our Partners"
            title="Trusted by Industry Leaders"
          />
          <div className="text-center text-white/50 py-12">
            No partners available
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding relative overflow-hidden py-[100px] bg-black">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative z-10 mx-auto">
        <SectionHeading
          subtitle="Our Partners"
          title="Trusted by Industry Leaders"
        />

        {/* Infinite Marquee */}
        <div className="relative overflow-hidden max-w-[1400px] mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center whitespace-nowrap"
          >
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="group bg-[hsl(240_12%_7%_/_0.4)] backdrop-blur-xl border border-border/50 rounded-xl
                        w-[250px] min-h-[100px] py-3 text-muted-foreground font-display text-lg tracking-wider
                        hover:text-white hover:border-red-500/30 flex items-center justify-center
                        transition-all duration-300 shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(p.imgURL)}
                  alt={p.nama}
                  className="w-[100px] h-[60px] object-contain grayscale transition duration-300 group-hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
