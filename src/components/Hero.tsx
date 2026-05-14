"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/animations/MagneticButton";

const Scene = dynamic(() => import("./3d/Scene").then(mod => mod.Scene), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#e5effa]" />
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[120vh] w-full overflow-hidden bg-[#e5effa] dark:bg-[#030303]"
    >
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <Scene />
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff] dark:from-[#030303] via-transparent to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 h-[100vh] flex flex-col justify-end pb-32 container-luxury pointer-events-none"
      >
        <div className="max-w-4xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-[#c9a96e]" />
            <h2 className="text-[#c9a96e] tracking-[0.4em] text-xs md:text-sm font-medium uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              The Pinnacle of Living
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] text-[#111111] dark:text-white tracking-tight mb-10 drop-shadow-sm"
          >
            Curating <br />
            <span className="text-gradient-gold font-medium italic pr-4">Extraordinary</span>
            <br /> Lifestyles.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-10"
          >
            {/* Premium Button */}
            <MagneticButton className="relative overflow-hidden group px-10 py-5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-medium tracking-[0.2em] text-xs rounded-none transition-all duration-700 hover:bg-[#c9a96e] dark:hover:bg-[#c9a96e] dark:hover:text-white hover:shadow-[0_0_40px_rgba(201,169,110,0.4)]">
              <span className="relative z-10 flex items-center gap-3">
                EXPLORE COLLECTION
                <div className="w-6 h-[1px] bg-white dark:bg-[#111111] transition-all duration-500 group-hover:w-10 group-hover:bg-white" />
              </span>
            </MagneticButton>

            <p className="text-gray-600 dark:text-gray-400 font-light max-w-sm text-sm leading-relaxed border-l border-black/10 dark:border-white/10 pl-6 p-4">
              Exclusive properties for the world's most discerning individuals. 
              Mumbai's definitive luxury real estate portfolio.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 mix-blend-plus-lighter"
      >
        <div className="w-[1px] h-20 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#c9a96e] to-transparent origin-top animate-scroll-line" />
        </div>
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-medium">Scroll</span>
      </motion.div>
    </section>
  );
}
