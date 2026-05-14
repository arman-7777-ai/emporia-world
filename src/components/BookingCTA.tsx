"use client";

import { useRef } from "react";
import MagneticButton from "./animations/MagneticButton";
import ScrollReveal from "./animations/ScrollReveal";
import TextReveal from "./animations/TextReveal";

export default function BookingCTA() {
  return (
    <section className="py-32 bg-[#ffffff] dark:bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#c9a96e]/5 dark:bg-[#c9a96e]/10" />
      <div className="container-luxury relative z-10 flex flex-col items-center text-center">
        
        <ScrollReveal direction="up" distance={20} duration={1}>
          <div className="w-12 h-[1px] bg-[#c9a96e] mb-8 mx-auto" />
          <h2 className="text-[#c9a96e] tracking-[0.4em] text-xs font-medium uppercase mb-6">
            Private Consultation
          </h2>
        </ScrollReveal>

        <TextReveal 
          as="h3" 
          splitBy="words" 
          className="font-display text-4xl md:text-6xl text-[#0a0a0a] dark:text-white font-light max-w-3xl mb-8 leading-[1.1]"
        >
          Speak With Our Luxury Real Estate Advisors.
        </TextReveal>

        <ScrollReveal delay={0.2} duration={1}>
          <p className="text-gray-600 dark:text-gray-400 font-light max-w-xl mx-auto mb-12">
            Schedule a private viewing or speak with our concierge team to explore 
            off-market properties tailored to your exact lifestyle requirements.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4} duration={1}>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
            <MagneticButton className="btn-luxury px-12 py-5 bg-[#0a0a0a] dark:bg-white text-white dark:text-[#0a0a0a] text-xs font-medium tracking-[0.2em] hover:bg-[#c9a96e] dark:hover:bg-[#c9a96e] dark:hover:text-white hover:shadow-[0_10px_40px_rgba(201,169,110,0.3)] transition-all duration-500 rounded-none uppercase">
              Book a Call
            </MagneticButton>
          </a>
        </ScrollReveal>

      </div>
    </section>
  );
}
