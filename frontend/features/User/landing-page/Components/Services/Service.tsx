"use client";
import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { ArrowUpRight } from "lucide-react";
import serviceInfra from "@/public/services/service-infra.jpg";
import serviceIct from "@/public/services/service-ict.jpg";
import serviceIt from "@/public/services/service-it.jpg";
import serviceIot from "@/public/services/service-iot.jpg";
import Image from "next/image";

const services = [
  {
    title: "Infrastructure",
    desc: "We provide reliable infrastructure solutions for your business needs. Our services include design and installation of structured cabling systems (SCS), GPON, UPS and Racking, and Raised Floors. Our service starts form design, planning and installation",
    image: serviceInfra,
  },
  {
    title: "Technology (ICT)",
    desc: "We provide ICT services including security systems (CCTV, Access Control, Fire Alarm Systems and Sound System), MATV systems, IP PBX, Audio-Video, Display Solutions, and Queueing Systems. Our service starts from design, planning and installation",
    image: serviceIct,
  },
  {
    title: "Information Technology (IT)",
    desc: "We provide IT services including Network-Switch & Access Point, Server Storage, HCI (Hyper Converged Infrastructure), and Network Security. Our service starts from design, planning and installation",
    image: serviceIt,
  },
  {
    title: "Internet of Things",
    desc: "We extend our expertise to encompass cutting-edge IoT services, ranging from robotics integration to sophisticated building automation systems. Our comprehensive suite of solutions empowers businesses to harness the potential of IoT technologies, enhacing operational efficiency, productivity, and overall perfomance. Our service starts from design, planning and installation",
    image: serviceIot,
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding bg-black py-10">
    <div className="max-w-[1400px] mx-auto">
      <SectionHeading
        subtitle="What We Do"
        title="Our Product and Service"
        description="We deliver end-to-end technology solutions to help businesses thrive in the digital era."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative rounded-2xl overflow-hidden h-[420px] cursor-pointer"
          >
            <Image
              src={s.image}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 border border-white/5 rounded-2xl border-white/20 transition-colors duration-500" />

            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-bold text-white tracking-tight">
                  {s.title}
                </h3>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed font-light group-hover:text-zinc-300 transition-colors duration-300 line-clamp-3">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
