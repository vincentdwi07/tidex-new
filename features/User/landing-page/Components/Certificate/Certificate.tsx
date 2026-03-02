/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { motion } from "framer-motion";
import CardSwap, { Card } from '@/components/CardSwap'
import { GlowLine } from "@/lib/constant/GlowLine";
import Image from "next/image";

const certificate = [
  {
    title: "Title 1",
    image: "Title 1",
    url: "/certificates/1.png"
  },
  {
    title: "Title 2",
    image: "Title 2",
    url: "/certificates/2.png"
  },
  {
    title: "Title 3",
    image: "Title 3",
    url: "/certificates/3.png"
  }
]

const CertificatesSection = () => (
  <section className="section-padding bg-black py-[100px]">
    <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center">
      <div className="col-span-1">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-500 font-display text-sm tracking-[0.3em] uppercase mb-4 block font-semibold text-center lg:text-left">
            CERTIFICATIONS
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight text-center lg:text-left">
            Our Certificate
          </h2>
          <div className={`w-24 h-0.5 ${GlowLine} mb-8 mx-auto lg:mx-0`} />
          <p className="text-white/80 text-base leading-relaxed">
            Internationally recognized certifications that validate our commitment to quality and excellence.
          </p>
          
        </motion.div>
      </div>

      <div
        className="col-span-2 relative h-[500px]" 
      >
        <CardSwap
          width={650}
          height={450}
          cardDistance={35}
          verticalDistance={65}
          delay={4000}
          pauseOnHover={false}
          onCardClick={() => {}}
          skewAmount={2}
        >
          {certificate.map((item, index) => (
            // @ts-ignore
            <Card key={index} customClass="group overflow-hidden border border-white/20 bg-black">
              <Image
                src={item.url}
                alt={item.image}
                width={1000}
                height={1000}
                className="object-contain w-full h-full px-10 transition-transform duration-700"
              />
              
              {/* Premium Title Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent -z-10" />
                <span className="text-red-500 text-[10px] tracking-[0.4em] uppercase font-bold block opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                  Certification
                </span>
                <div className="my-2 w-16 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <h3 className="text-white font-display font-bold text-2xl">
                  {item.title}
                </h3>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  </section>
);

export default CertificatesSection;
