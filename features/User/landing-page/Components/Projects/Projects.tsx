'use client'

import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const clients = [
  "Bi-cycle", "OU Hotel", "DailyFood", "Panasonic", "SPS",
  "Schneider", "APCO", "Meiji", "PELACON", "GPS Tech",
  "Miller", "Yello", "Satria", "JiPE", "Foxiron",
  "TBS Group",
];

const ProjectsSection = () => (
  <section id="projects" className="py-[80px] px-[20px] md:px-[60px] bg-[#000000] relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent z-10" />
    <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-black to-transparent z-10" />
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.2]" />
    <div className="relative z-10 max-w-[1400px] mx-auto">
      <SectionHeading
        subtitle="Portfolio"
        title="Our Project"
        description="For over 25 years, we have successfully completed a variety of projects with companies across sectors."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[16px]">
        {clients.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className="group backdrop-blur-[24px] bg-[rgba(15,15,20,0.4)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(239,68,68,0.3)] transition-all duration-300 rounded-[12px] aspect-[2/1] flex items-center justify-center px-[16px]"
          >
            <span className="font-['Poppins'] text-[14px] md:text-[16px] text-[#a1a1aa] group-hover:text-[#ffffff] font-medium tracking-wide text-center transition-colors duration-300">
              {c}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;