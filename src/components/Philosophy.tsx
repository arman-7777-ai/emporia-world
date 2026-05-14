"use client";

import { STATS } from "@/lib/constants";
import TextReveal from "./animations/TextReveal";
import ScrollReveal from "./animations/ScrollReveal";
import Parallax from "./animations/Parallax";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-32 md:py-48 bg-[#fafaf9] relative overflow-hidden">
      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <div>
            <ScrollReveal direction="up" distance={30} duration={1.2}>
              <h2 className="text-[#c9a96e] tracking-[0.4em] text-xs mb-6 font-medium uppercase drop-shadow-[0_0_8px_rgba(201,169,110,0.1)]">
                Our Philosophy
              </h2>
            </ScrollReveal>

            <TextReveal 
              as="h3"
              splitBy="words" 
              stagger={0.08}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-[#0a0a0a] mb-10"
            >
              Architecture as Fine Art.
            </TextReveal>

            <div className="space-y-6 text-gray-600 font-light text-base leading-relaxed max-w-xl">
              <ScrollReveal delay={0.2} duration={1.2}>
                <p>
                  At Emporia World, we do not merely sell properties; we curate legacies. 
                  Every residence in our portfolio represents the pinnacle of architectural 
                  achievement, meticulously selected for the world's most discerning individuals.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3} duration={1.2}>
                <p>
                  Our approach blends uncompromising luxury with visionary design, creating 
                  spaces that transcend traditional living. We believe that true luxury is 
                  found in the details—the flawless finish of a marble surface, the perfect 
                  alignment of a shadow gap, the orchestration of natural light.
                </p>
              </ScrollReveal>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 mt-20">
              {STATS.map((stat, index) => (
                <ScrollReveal
                  key={stat.label}
                  direction="up"
                  delay={0.4 + index * 0.15}
                  duration={1}
                >
                  <div className="border-l border-black/10 pl-6 hover:border-[#c9a96e]/50 transition-colors duration-500">
                    <div className="font-display text-4xl md:text-5xl text-[#0a0a0a] font-light mb-2">
                      {stat.prefix}
                      {stat.value}
                      <span className="text-[#c9a96e]">{stat.suffix}</span>
                    </div>
                    <div className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                      {stat.label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Image composition with Parallax */}
          <div className="relative h-[800px] w-full hidden lg:block">
            <Parallax speed={0.2} className="absolute top-0 right-0 w-[80%] h-[90%] z-10">
              <div className="w-full h-full relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90" 
                  alt="Architectural Detail" 
                  className="w-full h-full object-cover grayscale-[20%] brightness-90 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                <div className="absolute inset-0 border border-white/10 pointer-events-none transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-1000" />
              </div>
            </Parallax>
            
            <Parallax speed={-0.15} className="absolute bottom-0 left-0 w-[50%] h-[40%] z-20">
              <div className="w-full h-full relative overflow-hidden group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=90" 
                  alt="Interior Detail" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/30 group-hover:bg-transparent transition-colors duration-1000" />
              </div>
            </Parallax>
          </div>

        </div>
      </div>
    </section>
  );
}
