'use client'
import { motion } from "framer-motion";
import { Target, Users, HeartHandshake } from "lucide-react";
import { GlowLine } from "@/lib/constant/GlowLine";

const pillars = [
  { icon: Target, label: "Commitment", desc: "Our dedication to delivering excellence in every project we undertake." },
  { icon: Users, label: "Customer Centric", desc: "Putting our clients' needs at the heart of everything we do." },
  { icon: HeartHandshake, label: "Quality", desc: "Maintaining the highest standards across all our products and services." },
];

const BackgroundSection = () => (
  <section id="about" className="section-padding relative overflow-hidden bg-black py-24">
    {/* Background Decorative Elements */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.05),transparent_70%)]" />
    <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px]" />

    <div className="relative z-10 max-w-[1400px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-500 font-display text-sm tracking-[0.3em] uppercase mb-4 block font-semibold text-center lg:text-left">
            About Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight text-center lg:text-left">
            Corporate Background
          </h2>
          <div className={`w-24 h-0.5 ${GlowLine} mb-8 mx-auto lg:mx-0`} />
          
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-white text-lg leading-relaxed">
              Since 1997, we have evolved from an electronic products business into a comprehensive IT, ICT, and IoT Solution Integrator, guided by our commitment to quality, continuous improvement, and customer-focused values. Our mission is to deliver integrated technology solutions that are simple, secure, and efficient to support our customers’ business growth.
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              We believe that embodying these values as our corporate culture will drive progress and happiness for our associates and our valued customers.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-5"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="group relative p-6 flex items-center gap-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                <p.icon className="w-7 h-7 text-red-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-xl mb-1">{p.label}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm group-hover:text-zinc-300 transition-colors">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default BackgroundSection;
