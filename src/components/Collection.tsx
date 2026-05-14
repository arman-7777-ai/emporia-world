"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROPERTIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function Collection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="collection" ref={containerRef} className="py-32 bg-[#0a0a0a] relative">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[#c9a96e] tracking-[0.3em] text-sm mb-6 font-medium uppercase">
              The Collection
            </h2>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-white">
              Curated <br />
              <span className="italic text-gray-500">Masterpieces.</span>
            </h3>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 text-sm tracking-widest uppercase hover:text-[#c9a96e] transition-colors group"
          >
            View Full Portfolio
            <div className="w-10 h-[1px] bg-white group-hover:bg-[#c9a96e] group-hover:w-16 transition-all duration-500" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {PROPERTIES.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ property, index }: { property: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer block"
    >
      <div className="relative overflow-hidden aspect-[4/5] md:aspect-[3/4] bg-[#111]">
        <motion.img
          style={{ y, scale: 1.1 }}
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Tag */}
        <div className="absolute top-6 left-6 glass-subtle px-4 py-2 uppercase tracking-widest text-[10px] text-white backdrop-blur-md">
          {property.tag}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-smooth">
          <div className="flex justify-between items-end gap-4">
            <div>
              <p className="text-[#c9a96e] text-sm tracking-widest mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {property.location}
              </p>
              <h4 className="font-display text-2xl md:text-3xl text-white font-light mb-2">
                {property.name}
              </h4>
              <div className="flex gap-4 text-gray-400 text-sm font-light">
                <span>{property.specs.beds} Beds</span>
                <span className="w-[1px] h-4 bg-gray-600" />
                <span>{property.specs.area}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-xl font-light">{property.price}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
