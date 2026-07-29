"use client"
import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import Image from "next/image";

const partners = [
  { img: "Image 1", url: "/partner/1.svg" },
  { img: "Image 2", url: "/partner/2.svg" },
  { img: "Image 4", url: "/partner/4.svg" },
  { img: "Image 5", url: "/partner/5.svg" },
  { img: "Image 6", url: "/partner/6.svg" },
  { img: "Image 7", url: "/partner/7.svg" },
  { img: "Image 8", url: "/partner/8.svg" },
  { img: "Image 9", url: "/partner/27.svg" },
];


const PartnersSection = () => (
  <section className="section-padding relative overflow-hidden py-[100px] bg-black">
    <div className="absolute inset-0 grid-pattern opacity-30" />
    <div className="relative z-10 mx-auto">
      <SectionHeading subtitle="Our Partners" title="Trusted by Industry Leaders" />

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
              <Image
                src={p.url}
                alt={p.img}
                width={100}
                height={100}
                className="object-contain grayscale transition duration-300 group-hover:grayscale-0"
              />
            </div>

          ))}

        </motion.div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
