"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { PROPERTIES } from "@/lib/constants";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Environment, PresentationControls, ContactShadows, Float } from "@react-three/drei";
import { Skyscraper } from "./3d/Skyscraper";
import MagneticButton from "./animations/MagneticButton";

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Map vertical scroll to horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const activeProject = PROPERTIES.find((p) => p.id === selectedProject);

  return (
    <section id="collection" ref={containerRef} style={{ position: "relative" }} className="relative h-[400vh] bg-[#fafaf9]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Background Ambient Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[#c9a96e]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#c9a96e]/10 blur-[100px] rounded-full" />
        </div>

        {/* Section Header */}
        <div className="absolute top-20 left-10 md:left-20 z-10">
          <h2 className="text-[#c9a96e] tracking-[0.4em] text-xs font-medium uppercase mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
            Exclusive Portfolio
          </h2>
          <h3 className="font-display text-3xl md:text-5xl font-light text-[#0a0a0a] tracking-tight">
            The Collection.
          </h3>
        </div>

        {/* Horizontal Track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-10 md:gap-20 px-10 md:px-20 z-10 w-[400vw]"
        >
          {PROPERTIES.map((property, index) => (
            <ProjectCard 
              key={property.id} 
              property={property} 
              index={index}
              onClick={() => setSelectedProject(property.id)} 
            />
          ))}
        </motion.div>
      </div>

      {/* Expanded Project Overlay */}
      <AnimatePresence>
        {selectedProject && activeProject && (
          <ExpandedProject 
            property={activeProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ property, index, onClick }: { property: any; index: number; onClick: () => void }) {
  return (
    <motion.div
      layoutId={`card-${property.id}`}
      onClick={onClick}
      className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] cursor-pointer group flex-shrink-0 mt-20"
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
        <motion.img
          layoutId={`image-${property.id}`}
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000" />
      </div>

      {/* Premium Glass Overlay */}
      <div className="absolute bottom-10 left-10 right-10 p-8 glass backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-700 ease-smooth z-20 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent z-[-1]" />
         <div className="flex justify-between items-end">
           <div>
             <h4 className="font-display text-3xl text-white font-light mb-2">{property.name}</h4>
             <p className="text-[#c9a96e] text-sm tracking-widest uppercase">{property.location}</p>
           </div>
           <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white bg-white/5">
              <ArrowRight size={20} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
           </div>
         </div>
      </div>

      {/* Default Tags */}
      <motion.div layoutId={`tags-${property.id}`} className="absolute top-10 left-10 flex flex-col gap-4">
        <div className="glass-subtle px-4 py-2 uppercase tracking-[0.2em] text-[10px] text-white">
          {property.tag}
        </div>
        <div className="glass-subtle px-4 py-2 uppercase tracking-[0.2em] text-[10px] text-[#c9a96e]">
          {property.price}
        </div>
      </motion.div>

      {/* Default Title (when not hovered) */}
      <div className="absolute bottom-10 left-10 group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none">
        <h4 className="font-display text-4xl md:text-5xl text-white font-light drop-shadow-2xl">{property.name}</h4>
      </div>
      
      {/* Clickable Overlay */}
      <div 
        className="absolute inset-0 z-30" 
        onClick={onClick}
      />
    </motion.div>
  );
}

function ExpandedProject({ property, onClose }: { property: any; onClose: () => void }) {
  // Generate random building variations based on property ID
  const levels = 25 + (property.id * 5);
  const twist = 0.02 * property.id;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#fafaf9] overflow-hidden flex"
    >
      {/* 3D Interactive Architecture View */}
      <div className="w-full lg:w-[65%] h-full relative bg-gradient-to-tr from-[#fafaf9] via-[#e5effa] to-[#d0e5f5]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute inset-0"
        >
          <Canvas 
            camera={{ position: [0, 8, 25], fov: 45 }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
          >
            <color attach="background" args={["#e5effa"]} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 20, 10]} intensity={2.5} color="#ffffff" castShadow />
            <pointLight position={[-10, 5, 5]} intensity={1} color="#c9a96e" />
            <Environment preset="city" />
            
            <PresentationControls 
              global 
              rotation={[0, 0.3, 0]} 
              polar={[-Math.PI / 3, Math.PI / 3]} 
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                 <group position={[0, -5, 0]}>
                   <Skyscraper />
                 </group>
              </Float>
            </PresentationControls>
            
            <ContactShadows position={[0, -10, 0]} opacity={0.3} scale={30} blur={2} color="#0a0a0a" />
          </Canvas>
        </motion.div>
        
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent to-[#fafaf9] hidden lg:block" />
        
        {/* Interaction Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full pointer-events-none z-10"
        >
          <p className="text-[#0a0a0a]/60 text-[10px] uppercase tracking-[0.3em]">Drag to interact</p>
        </motion.div>
      </div>

      {/* Details Panel */}
      <div className="absolute lg:relative right-0 w-full lg:w-[35%] h-full bg-gradient-to-t from-white via-white/90 to-white/40 lg:bg-[#fafaf9] p-10 md:p-20 flex flex-col justify-end lg:justify-center z-20 pointer-events-none lg:pointer-events-auto">
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 text-[#0a0a0a]/50 hover:text-[#0a0a0a] transition-colors z-50 pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full glass border border-black/10 shadow-sm"
        >
          <X size={24} />
        </button>

        <div className="pointer-events-auto">
          <motion.div
            layoutId={`tags-${property.id}`}
            className="flex gap-4 mb-8"
          >
            <div className="glass px-4 py-2 uppercase tracking-[0.2em] text-[10px] text-[#0a0a0a] font-medium border border-black/10">
              {property.tag}
            </div>
            <div className="glass px-4 py-2 uppercase tracking-[0.2em] text-[10px] text-green-700 font-medium border border-black/10">
              Available
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl md:text-6xl text-[#0a0a0a] font-light leading-[1.1] mb-4"
          >
            {property.name}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[#c9a96e] tracking-[0.2em] uppercase text-sm mb-10 font-medium"
          >
            {property.location}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-8 mb-12 border-y border-black/10 py-8"
          >
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-medium">Price</p>
              <p className="text-[#0a0a0a] text-xl font-light">{property.price}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-medium">Area</p>
              <p className="text-[#0a0a0a] text-xl font-light">{property.specs.area}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-medium">Bedrooms</p>
              <p className="text-[#0a0a0a] text-xl font-light">{property.specs.beds} Suites</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-medium">Bathrooms</p>
              <p className="text-[#0a0a0a] text-xl font-light">{property.specs.baths} Baths</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
             <motion.button 
               whileTap={{ scale: 0.96 }}
               onClick={(e: any) => e.preventDefault()}
               className="flex-1 btn-luxury bg-[#0a0a0a] text-white py-4 uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#c9a96e] hover:text-white transition-colors"
             >
               Schedule Viewing
             </motion.button>
             <motion.button 
               whileTap={{ scale: 0.96 }}
               onClick={(e: any) => e.preventDefault()}
               className="flex-1 btn-luxury border border-black/10 text-[#0a0a0a] py-4 uppercase tracking-[0.2em] text-xs font-medium hover:bg-black/5 transition-colors"
             >
               Download Brochure
             </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
