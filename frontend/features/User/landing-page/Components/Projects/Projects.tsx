"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading";
import { getProjects, getImageUrl, type Project } from "@/lib/api";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects(1, 100)
      .then((res) => {
        setProjects(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="projects"
      className="py-[80px] px-[20px] md:px-[60px] bg-[#000000] relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent z-10" />
      <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.2]" />
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <SectionHeading
          subtitle="Portfolio"
          title="Our Project"
          description="For over 25 years, we have successfully completed a variety of projects with companies across sectors."
        />

        {loading ? (
          <div className="text-center text-white/50 py-12">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-white/50 py-12">
            No projects available
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[16px]">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="backdrop-blur-[24px] bg-[rgba(15,15,20,0.4)] border border-[rgba(255,255,255,0.1)] rounded-[12px] overflow-hidden flex flex-col items-center gap-3 px-4 py-5"
              >
                {/* Logo 1:1 */}
                <div className="w-full aspect-square rounded-[8px] overflow-hidden flex items-center justify-center">
                  {p.imgURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={getImageUrl(p.imgURL)}
                      alt={p.nama}
                      className="w-full h-full object-contain p-3"
                    />
                  ) : (
                    <span className="font-['Poppins'] text-[20px] font-bold text-white/40">
                      {p.nama.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {/* Name */}
                <span className="font-['Poppins'] text-[12px] text-white font-medium tracking-wide text-center leading-snug">
                  {p.nama}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
