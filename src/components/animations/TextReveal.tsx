"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "chars" | "words" | "lines";
  scrub?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.03,
  splitBy = "chars",
  scrub = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = children;
    el.innerHTML = "";

    let parts: string[];
    if (splitBy === "words") {
      parts = text.split(" ");
    } else if (splitBy === "lines") {
      parts = text.split("\n");
    } else {
      parts = text.split("");
    }

    const spans = parts.map((part) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.textContent = splitBy === "words" ? part + "\u00A0" : part === " " ? "\u00A0" : part;
      inner.style.display = "inline-block";
      inner.style.willChange = "transform, opacity";

      wrapper.appendChild(inner);
      el.appendChild(wrapper);
      return inner;
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        {
          y: "110%",
          opacity: 0,
          rotateX: -80,
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger,
          delay,
          ease: EASE.luxury,
          scrollTrigger: scrub
            ? {
                trigger: el,
                start: "top 85%",
                end: "top 30%",
                scrub: 1,
              }
            : {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
        }
      );
    });

    return () => ctx.revert();
  }, [children, delay, stagger, splitBy, scrub]);

  return <Tag ref={ref as any} className={className} />;
}
