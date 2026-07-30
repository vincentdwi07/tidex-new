"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  Award,
  Handshake,
  Target,
  Eye,
  Sparkles,
  DollarSign,
  Globe,
  Lock,
  Users,
  Zap,
  Monitor,
  Leaf,
  TrendingUp,
} from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { Glassmorph } from "@/lib/constant/Glassmorph";

const stats = [
  { value: "25+", label: "Years in Business" },
  { value: "50+", label: "Projects Completed" },
  { value: "50+", label: "Technology Partners" },
  { value: "250+", label: "Clients Served" },
];

const values = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "Commitment to Quality",
    desc: "Every solution we design and deliver meets the highest standards. We use certified products and proven methodologies to ensure long-term performance.",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Continuous Self-Development",
    desc: "Technology evolves fast. We stay ahead of the curve so our clients always have access to the most relevant and future-proof solutions.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Customer First",
    desc: "Our customers are the heart of all our business endeavors. We listen, adapt, and deliver solutions that truly address their needs.",
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "Long-term Partnership",
    desc: "We build lasting relationships, not one-off transactions. Your success is our success — and we treat every project as if it were our own.",
  },
];

const drivers = [
  {
    icon: <DollarSign className="w-7 h-7" />,
    label: "Cost Reduction & Competitiveness",
  },
  { icon: <Globe className="w-7 h-7" />, label: "Technology Demands" },
  { icon: <Lock className="w-7 h-7" />, label: "Security & Access Control" },
  { icon: <Users className="w-7 h-7" />, label: "Customer Behaviour" },
  { icon: <Zap className="w-7 h-7" />, label: "Energy Management" },
  { icon: <Monitor className="w-7 h-7" />, label: "Workplace Evolution" },
  {
    icon: <Leaf className="w-7 h-7" />,
    label: "Corporate Social Responsibility",
  },
  { icon: <TrendingUp className="w-7 h-7" />, label: "Uptrend Production" },
];

const AboutUsPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* ── Hero ── */}
      <section className="relative bg-black overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-10 xl:px-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.08),transparent_65%)]" />
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px]" />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(closest-side, rgba(239,68,68,0.4), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.06]" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 ${Glassmorph} px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-white/80 mb-7 rounded-xl`}
          >
            <Sparkles className="w-3 h-3 text-red-400" />
            About Us
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6"
          >
            PT. Tidex{" "}
            <span className="bg-[linear-gradient(90deg,red,blue)] bg-clip-text text-transparent">
              Titan Persada
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white font-light md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A trusted technology integrator delivering end-to-end
            Infrastructure, ICT, IT, and IoT solutions across Indonesia since
            1997.
          </motion.p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-black px-6 md:px-10 xl:px-0 pb-16">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-px ${Glassmorph} rounded-2xl overflow-hidden`}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col items-center justify-center gap-1.5 py-8 px-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300"
              >
                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs text-white/50 tracking-wide text-center">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="bg-black px-6 md:px-10 xl:px-0 pb-20">
        <div className="max-w-7xl mx-auto">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#0a0a0a"
            borderRadius={24}
            glowRadius={40}
            glowIntensity={0.8}
            coneSpread={25}
            animated={false}
            colors={["red", "purple"]}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left */}
              <div className="p-8 md:p-12 flex flex-col justify-center gap-6 border-b md:border-b-0 md:border-r border-white/[0.06]">
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-red-400/80 mb-3">
                    Who We Are
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug tracking-tight">
                    Building the backbone of tomorrow&apos;s businesses
                  </h2>
                </div>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Since 1997,{" "}
                  <span className="font-semibold">PT. Tidex Titan Persada</span>{" "}
                  embarked on our business journey starting with electronic
                  products, and over time, we have evolved into a comprehensive
                  Solution Integrator encompassing the fields of IT, ICT, and
                  IoT.
                </p>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Throughout this journey, we have remained steadfast in our
                  core values: a Commitment to quality, continuous
                  Self-Development, and prioritizing our Customers as the heart
                  of all our business endeavors. We believe that embodying these
                  values as our corporate culture will drive progress and
                  happiness for us, our associates, and our valued customers.
                </p>
              </div>

              {/* Right: timeline */}
              <div className="p-8 md:p-12 flex flex-col justify-center gap-5">
                {[
                  {
                    year: "1997",
                    desc: "Founded as an electronic products distributor in Indonesia",
                  },
                  {
                    year: "2000s",
                    desc: "Expanded into ICT integration — CCTV, Access Control, structured cabling",
                  },
                  {
                    year: "2010s",
                    desc: "Added IT infrastructure: server, networking, cloud, and HCI solutions",
                  },
                  {
                    year: "Today",
                    desc: "Full-stack Solution Integrator across Infrastructure, IT, ICT, and IoT",
                  },
                ].map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="shrink-0 w-16 text-right">
                      <span className="text-xs font-bold text-red-400/80 tracking-widest uppercase">
                        {m.year}
                      </span>
                    </div>
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-0.5" />
                      {i < 3 && (
                        <div className="w-px flex-1 min-h-[32px] bg-gradient-to-b from-red-500/40 to-transparent mt-1" />
                      )}
                    </div>
                    <p className="text-white text-sm leading-relaxed pb-2">
                      {m.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="bg-black px-6 md:px-10 xl:px-0 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-red-400/80 mb-2">
              Direction
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Vision &amp; Mission
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#0a0a0a"
                borderRadius={20}
                glowRadius={35}
                glowIntensity={0.7}
                coneSpread={25}
                animated={false}
                colors={["red", "purple"]}
              >
                <div className="p-8 flex flex-col gap-5 min-h-[220px]">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      Vision
                    </h3>
                    <p className="text-white text-sm leading-relaxed">
                      To be the most trusted technology integration partner in
                      Indonesia — recognized for our excellence, reliability,
                      and commitment to long-term client success across every
                      sector we serve.
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#0a0a0a"
                borderRadius={20}
                glowRadius={35}
                glowIntensity={0.7}
                coneSpread={25}
                animated={false}
                colors={["red", "purple"]}
              >
                <div className="p-8 flex flex-col gap-5 min-h-[220px]">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      Mission
                    </h3>
                    <p className="text-white text-sm leading-relaxed">
                      We deliver integrated technology solutions that drive
                      measurable value for our clients, while maintaining the
                      highest standards of quality in every product and service
                      we provide. We foster lasting partnerships built on trust,
                      transparency, and expertise — and continuously innovate to
                      stay at the forefront of an ever-evolving technology
                      landscape.
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why We Need Technology Development ── */}
      <section className="bg-black px-6 md:px-10 xl:px-0 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
              Why We Need Technology Development?
            </h2>
            <p className="text-red-400 text-xl md:text-2xl font-bold tracking-tight">
              The Top Drivers For Change
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {drivers.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#0a0a0a"
                  borderRadius={16}
                  glowRadius={28}
                  glowIntensity={0.6}
                  coneSpread={25}
                  animated={false}
                  colors={["red", "purple"]}
                >
                  <div className="flex items-center justify-between gap-3 px-5 py-5 min-h-[80px]">
                    <span className="text-white text-sm font-medium leading-snug">
                      {d.label}
                    </span>
                    <div className="shrink-0 text-red-500 group-hover:text-red-400 transition-colors duration-300">
                      {d.icon}
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="bg-black px-6 md:px-10 xl:px-0 pb-28">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-red-400/80 mb-2">
              What Drives Us
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#0a0a0a"
                  borderRadius={20}
                  glowRadius={30}
                  glowIntensity={0.6}
                  coneSpread={25}
                  animated={false}
                  colors={["red", "purple"]}
                >
                  <div className="p-6 flex flex-col gap-4 h-full">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500/15 transition-colors duration-300">
                      {v.icon}
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {v.title}
                    </h3>
                    <p className="text-white text-sm leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
