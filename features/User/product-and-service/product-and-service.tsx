"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Cpu, Network, Radio, Sparkles } from "lucide-react";
import serviceInfra from "@/public/services/service-infra.jpg";
import serviceIct from "@/public/services/service-ict.jpg";
import serviceIt from "@/public/services/service-it.jpg";
import serviceIot from "@/public/services/service-iot.jpg";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { Glassmorph } from "@/lib/constant/Glassmorph";
import BorderGlow from "@/components/BorderGlow";

type Product = {
  title: string;
  desc: string;
  image: StaticImageData;
  brands: string[];
};

const categories: {
  id: string;
  label: string;
  icon: typeof Server;
  tagline: string;
  products: Product[];
}[] = [
  {
    id: "infra",
    label: "Infrastructure",
    icon: Server,
    tagline: "Backbone-grade infrastructure engineered for continuity.",
    products: [
      {
        title: "Structured Cable Systems",
        desc: "Vertical and horizontal cabling up to the backbone, supporting voice, data, and video through a single wiring system that adheres to international multi-vendor standards — with a 25-year warranty for long-term peace of mind.",
        image: serviceInfra,
        brands: ["Siemon"],
      },
      {
        title: "Gigabit Passive Optical Network (GPON)",
        desc: "Fiber-to-the-Home networks engineered for higher speeds and long-distance transmission. GPON reduces active equipment, supports triple-play services, and enables point-to-multipoint connections with elevated downstream throughput.",
        image: serviceIct,
        brands: ["ZTE", "DASAN"],
      },
      {
        title: "Uninterruptible Power Supply (UPS)",
        desc: "Emergency power delivery the moment your primary source fails. Protects data centers, telecommunications equipment, and critical electronics from outages, equipment damage, and downtime.",
        image: serviceIt,
        brands: ["APC", "AWP"],
      },
      {
        title: "Racking Server Network",
        desc: "Server racks for organizing active devices — switches, storage, NVR — into clean, maintainable layouts. Patch panels, wire management, and cantilevers included as part of a complete installation service.",
        image: serviceIot,
        brands: ["IND4 Rack", "Siemon"],
      },
      {
        title: "Raised Floor",
        desc: "Professional raised floor solutions designed for optimal cable management, efficient cooling, and maximum flexibility — a secure, scalable foundation for modern data centers and server rooms.",
        image: serviceInfra,
        brands: ["Dawn"],
      },
    ],
  },
  {
    id: "it",
    label: "Information Technology",
    icon: Cpu,
    tagline: "Software, cloud, and security tailored to enterprise scale.",
    products: [
      {
        title: "Custom Software Development",
        desc: "Bespoke applications built around your operations — from internal tooling to customer-facing platforms — delivered with modern stacks and long-term maintainability in mind.",
        image: serviceIt,
        brands: ["Microsoft", "Oracle"],
      },
      {
        title: "Cloud & Managed Services",
        desc: "Cloud migration, hybrid architecture, and 24/7 managed operations to keep your workloads performant, observable, and cost-efficient.",
        image: serviceIct,
        brands: ["AWS", "Azure"],
      },
      {
        title: "Network Security",
        desc: "Layered defense including next-gen firewalls, endpoint protection, and continuous monitoring to safeguard data, identities, and infrastructure.",
        image: serviceInfra,
        brands: ["Fortinet", "Cisco"],
      },
    ],
  },
  {
    id: "ict",
    label: "Information Communication (ICT)",
    icon: Network,
    tagline: "Unified communications and connectivity for modern teams.",
    products: [
      {
        title: "Networking & IT Services",
        desc: "End-to-end LAN, WAN, and SD-WAN deployments with structured monitoring and lifecycle management for enterprise environments.",
        image: serviceIct,
        brands: ["Cisco", "Aruba"],
      },
      {
        title: "PABX & WiFi Solutions",
        desc: "Enterprise telephony and high-density wireless coverage that scales across offices, factories, and campuses without compromise.",
        image: serviceIt,
        brands: ["Panasonic", "Ruckus"],
      },
      {
        title: "Public Address & Broadcasting",
        desc: "Crystal-clear PA, intercom, and broadcasting systems engineered for reliability in mission-critical and large-venue environments.",
        image: serviceInfra,
        brands: ["TOA", "Bosch"],
      },
    ],
  },
  {
    id: "iot",
    label: "Internet of Things",
    icon: Radio,
    tagline: "Connected sensing, automation, and intelligence at the edge.",
    products: [
      {
        title: "Smart Building Automation",
        desc: "Centralized control of HVAC, lighting, access, and energy — turning buildings into responsive, efficient, data-driven assets.",
        image: serviceIot,
        brands: ["Siemens", "Schneider"],
      },
      {
        title: "Environmental Monitoring",
        desc: "Real-time sensing of temperature, humidity, air quality, and power conditions across distributed sites with intelligent alerting.",
        image: serviceIct,
        brands: ["Vaisala", "Honeywell"],
      },
      {
        title: "IoT Performance Analytics",
        desc: "Edge-to-cloud telemetry pipelines and dashboards that turn raw device data into operational decisions and predictive insight.",
        image: serviceIt,
        brands: ["AWS IoT", "Azure IoT"],
      },
    ],
  },
];

const Products = () => {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-black overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24 px-10 xl:px-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px]" />

        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--primary) / 0.55), transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-white/80 mb-7"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            Product & Service
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
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
            className="text-white/80 font-light md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            A unified portfolio across Infrastructure, IT, ICT, and IoT —
            designed to operate at the standard of a modern, mission-critical
            organization.
          </motion.p>
        </div>
      </section>

      {/* Tabs */}
      <section className="relative bg-black px-10 xl:px-0">
        <div className="max-w-[1400px] mx-auto">
          <div
            className={`sticky top-[68px] z-30 ${Glassmorph} rounded-2xl p-1.5 flex gap-1 overflow-x-auto no-scrollbar`}
          >
            {categories.map((c) => {
              const Icon = c.icon;
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`relative flex grow items-center justify-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-active"
                      className="absolute inset-0 rounded-xl bg-[#120F17] border border-red-500/30 shadow-[0_0_30px_-10px_#ef444499]"
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
      <section className="px-10 xl:px-0 bg-black pt-10 md:pt-14 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-6 md:space-y-8"
            >
              {current.products.map((p, i) => (
                <ProductRow key={p.title} product={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

const ProductRow = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const reverse = index % 2 === 1;
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
        backgroundColor="#120F17"
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
          <div className="relative aspect-4/3 md:aspect-auto md:min-h-[360px] overflow-hidden!">
            <Image
              src={product.image}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1200 group-hover:scale-105"
            />
            <div className="absolute inset-0" />
          </div>

          {/* Content */}
          <div className="relative p-7 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-primary/80 mb-4">
              <span className="w-6 h-px bg-primary/60" />0{index + 1}
            </div>
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4 tracking-tight">
              {product.title}
            </h3>
            <p className="text-white/80 text-sm md:text-[15px] leading-relaxed mb-7 max-w-xl">
              {product.desc}
            </p>

            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-2">
                  Trusted Brands
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.brands.map((b) => (
                    <span
                      key={b}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-white/90 bg-white/5 border border-white/10 backdrop-blur"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.article>
  );
};

export default Products;
