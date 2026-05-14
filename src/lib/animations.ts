import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Premium Easing Curves ─── */
export const EASE = {
  // Apple-style luxury easing
  luxury: "power4.out",
  // Smooth cinematic reveal
  cinematic: "power3.inOut",
  // Elegant entrance
  entrance: "expo.out",
  // Physical snap
  snap: "back.out(1.2)",
  // Silky smooth
  silk: "sine.inOut",
  // Dramatic reveal
  dramatic: "power4.inOut",
} as const;

/* ─── Duration Presets ─── */
export const DURATION = {
  fast: 0.5,
  normal: 0.8,
  slow: 1.2,
  cinematic: 1.6,
  dramatic: 2.0,
} as const;

/* ─── Framer Motion Variants ─── */

// Stagger children entrance
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Fade up entrance for children
export const fadeUpChild = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Fade in from left
export const fadeLeftChild = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

// Fade in from right
export const fadeRightChild = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

// Scale reveal
export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// Line draw from left
export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// Character stagger for text
export const charStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
};

export const charChild = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── GSAP Scroll Animation Helpers ─── */

export function createScrollFade(
  element: HTMLElement,
  options?: { start?: string; end?: string; scrub?: number }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: EASE.luxury,
      scrollTrigger: {
        trigger: element,
        start: options?.start ?? "top 85%",
        end: options?.end ?? "top 40%",
        scrub: options?.scrub ?? false,
        toggleActions: "play none none reverse",
      },
    }
  );
}

export function createParallax(
  element: HTMLElement,
  speed: number = 0.3,
  options?: { start?: string; end?: string }
) {
  return gsap.to(element, {
    yPercent: -speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: options?.start ?? "top bottom",
      end: options?.end ?? "bottom top",
      scrub: 1,
    },
  });
}

export function createTextSplit(
  element: HTMLElement,
  options?: { stagger?: number; delay?: number }
) {
  const text = element.textContent || "";
  element.innerHTML = "";
  const chars = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(100%)";
    element.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: options?.stagger ?? 0.02,
    delay: options?.delay ?? 0,
    ease: EASE.luxury,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}
