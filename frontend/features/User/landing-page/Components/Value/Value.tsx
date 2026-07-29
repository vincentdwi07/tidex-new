"use client";
import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { Briefcase, Zap, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Briefcase,
    title: "Professional Experts",
    desc: "Highly experienced and certified engineers recognized for delivering results across all industries.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    desc: "Our professional staff is always ready to respond to requests, maintenance, and after-sales commitments.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty",
    desc: "We provide long-term warranty for our products and services to ensure maximum satisfaction.",
  },
];

const ValuesSection = () => (
  <section className="section-padding bg-black py-20">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-0">
      <SectionHeading
        subtitle="Why Choose Us"
        title="Our Value"
        description="Delivering excellence through professional expertise, rapid response, and reliable warranty."
      />

      <div className="grid md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative p-10 text-center group rounded-3xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all duration-500"
          >
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
              <v.icon className="w-9 h-9 text-red-500" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4 tracking-tight">
              {v.title}
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
              {v.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValuesSection;
