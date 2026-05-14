"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  distance?: number;
  stagger?: number;
  scrub?: boolean;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 1,
  distance = 60,
  scrub = false,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = { opacity: 0 };
    const to: gsap.TweenVars = { opacity: 1, duration, delay, ease: EASE.luxury };

    switch (direction) {
      case "up":
        from.y = distance;
        to.y = 0;
        break;
      case "down":
        from.y = -distance;
        to.y = 0;
        break;
      case "left":
        from.x = distance;
        to.x = 0;
        break;
      case "right":
        from.x = -distance;
        to.x = 0;
        break;
      case "scale":
        from.scale = 0.85;
        to.scale = 1;
        break;
    }

    to.scrollTrigger = scrub
      ? {
          trigger: el,
          start: "top 90%",
          end: "top 30%",
          scrub: 1.5,
        }
      : {
          trigger: el,
          start: "top 85%",
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        };

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, to);
    });

    return () => ctx.revert();
  }, [direction, delay, duration, distance, scrub, once]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
