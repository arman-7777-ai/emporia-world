"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "vertical" | "horizontal";
  scale?: boolean;
  opacity?: boolean;
}

export default function Parallax({
  children,
  className = "",
  speed = 0.3,
  direction = "vertical",
  scale = false,
  opacity = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRange = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const xRange = useTransform(scrollYProgress, [0, 1], [speed * 50, -speed * 50]);
  const scaleRange = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const style: Record<string, any> = {};

  if (direction === "vertical") {
    style.y = yRange;
  } else {
    style.x = xRange;
  }

  if (scale) {
    style.scale = scaleRange;
  }

  if (opacity) {
    style.opacity = opacityRange;
  }

  return (
    <motion.div
      ref={ref}
      style={{ ...style, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
