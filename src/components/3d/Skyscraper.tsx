"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";

export function Skyscraper() {
  const group = useRef<Group>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Normalize scroll (approx max scroll 1000px for hero)
      const scroll = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollY(scroll);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      // Very slow ambient rotation
      group.current.rotation.y += delta * 0.05;
      
      // Scroll-based rotation overlay
      // We lerp the entire group towards the ambient rotation + scroll offset
      const targetRotation = group.current.rotation.y + (scrollY * Math.PI * 0.05);
      
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        targetRotation,
        0.1
      );
    }
  });

  const levels = 35;
  const levelHeight = 0.8;

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
              <meshStandardMaterial 
                color="#e5effa"
                metalness={1}
                roughness={0.05}
                envMapIntensity={3.5}
                transparent={true}
                opacity={0.85}
              />
            </mesh>

          </group>
        );
      })}
    </group>
  );
}
