"use client"
import '@/app/globals.css'
import { motion } from "framer-motion";
import { GlowLine } from "@/lib/constant/GlowLine";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
}

const SectionHeading = ({ subtitle, title, description }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <span className="text-red-500 font-display text-sm tracking-[0.3em] uppercase mb-3 block">
      {subtitle}
    </span>
    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
      {title}
    </h2>
    <div className={`w-24 h-0.5 ${GlowLine} mx-auto mb-6`} />
    {description && (
      <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
