"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils, Mesh } from "three";
import { useScroll } from "framer-motion";

export function Skyscraper() {
  const group = useRef<Group>(null);
  
  const { scrollYProgress } = useScroll();

  useFrame((state, delta) => {
    if (group.current) {
      // Very slow ambient rotation
      group.current.rotation.y += delta * 0.02;
      
      // Scroll-based rotation overlay
      const scrollValue = scrollYProgress.get();
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        scrollValue * Math.PI * 0.5,
        0.05
      );
    }
  });

  const levels = 35;
  const levelHeight = 0.8;

  // Generate random window lights to give life to the building
  const windows = useMemo(() => {
    const lights = [];
    for (let i = 0; i < levels; i++) {
      for (let j = 0; j < 4; j++) {
        if (Math.random() > 0.7) {
          lights.push({ level: i, face: j });
        }
      }
    }
    return lights;
  }, []);

  return (
    <group ref={group} position={[0, -10, 0]}>
      {/* Base Foundation */}
      <mesh position={[0, levelHeight / 2, 0]}>
        <boxGeometry args={[5, levelHeight, 5]} />
        <meshStandardMaterial color="#8e8e93" roughness={0.9} />
      </mesh>

      {Array.from({ length: levels }).map((_, i) => {
        const y = i * levelHeight + levelHeight;
        // Subtle taper
        const scale = 1 - i * 0.008;
        // Subtle twist
        const twist = i * 0.03;

        return (
          <group key={i} position={[0, y, 0]} rotation={[0, twist, 0]} scale={[scale, 1, scale]}>
            {/* Inner Core */}
            <mesh>
              <boxGeometry args={[3.8, levelHeight, 3.8]} />
              <meshStandardMaterial color="#e5e5ea" roughness={0.8} />
            </mesh>
            
            {/* Glass Shell */}
            <mesh>
              <boxGeometry args={[4, levelHeight - 0.05, 4]} />
              <meshPhysicalMaterial 
                color="#e5effa"
                metalness={0.9}
                roughness={0.02}
                envMapIntensity={3.5}
                clearcoat={1}
                clearcoatRoughness={0.05}
                transparent={true}
                opacity={0.85}
              />
            </mesh>

            {/* Illuminated Windows */}
            {windows
              .filter((w) => w.level === i)
              .map((w, index) => {
                const rot = (w.face * Math.PI) / 2;
                return (
                  <mesh key={index} position={[0, 0, 0]} rotation={[0, rot, 0]}>
                    <mesh position={[0, 0, 2.01]}>
                      <planeGeometry args={[0.5, levelHeight - 0.2]} />
                      <meshBasicMaterial 
                        color={Math.random() > 0.5 ? "#c9a96e" : "#ffead0"} 
                        toneMapped={false} 
                      />
                    </mesh>
                  </mesh>
                );
              })}
          </group>
        );
      })}
    </group>
  );
}
