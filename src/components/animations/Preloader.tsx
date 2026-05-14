"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let t: NodeJS.Timeout;
    
    // Ensure the preloader stays on screen for at least 2.5 seconds to cover dynamic import lag
    const minDelay = setTimeout(() => {
      if (!active) {
        setShow(false);
      }
    }, 2500);

    // If progress completes after the minimum delay
    if (!active && progress === 100) {
      t = setTimeout(() => setShow(false), 3000);
    }
    
    return () => {
      clearTimeout(minDelay);
      if (t) clearTimeout(t);
    };
  }, [progress, active]);

  // Fallback timeout to ensure the app loads even if 3D hangs
  useEffect(() => {
    const fallback = setTimeout(() => setShow(false), 8000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[999] bg-[#ffffff] flex flex-col items-center justify-center pointer-events-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="w-5 h-5 border-[1.5px] border-[#c9a96e] transform rotate-45 flex items-center justify-center animate-[float_3s_ease-in-out_infinite]">
                <div className="w-1.5 h-1.5 bg-[#c9a96e]" />
              </div>
              <span className="font-display font-light text-xl tracking-[0.2em] text-[#111111]">
                EMPORIA<span className="font-medium text-[#c9a96e]">WORLD</span>
              </span>
            </div>
            
            <div className="w-64 h-[1px] bg-black/10 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-0 h-full bg-[#c9a96e]"
              />
            </div>
            
            <div className="mt-4 flex justify-between w-64 text-[10px] uppercase tracking-[0.3em] text-gray-500">
              <span>Loading Experience</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
