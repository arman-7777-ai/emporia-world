"use client";

import { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sky, Clouds, Cloud } from "@react-three/drei";
import { MathUtils } from "three";
import { Skyscraper } from "./Skyscraper";

function CameraRig() {
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

  useFrame((state) => {
    // Smoothly interpolate camera position based on scroll
    // Start low, looking up (hero), move up as user scrolls
    const targetY = MathUtils.lerp(2, 15, scrollY);
    const targetZ = MathUtils.lerp(18, 25, scrollY);
    const targetX = MathUtils.lerp(0, 10, scrollY);
    
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, targetX, 0.05);

    // Look slightly up at the building
    state.camera.lookAt(0, 12, 0);
  });

  return null;
}

export function Scene() {
  return (
    <Canvas 
      camera={{ position: [0, 2, 18], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "default" }}
      dpr={1}
    >
      <color attach="background" args={["#e5effa"]} />
      
      {/* Cinematic Daytime Lighting */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight 
        position={[20, 50, -20]} 
        intensity={2.5} 
        color="#fff5e6" 
      />
      <directionalLight 
        position={[-10, 20, 10]} 
        intensity={1} 
        color="#aaccff" 
      />

      {/* The Magic: Environment maps make the glass reflect a city instead of black! */}
      <Environment preset="city" />
      <Sky sunPosition={[100, 20, -100]} turbidity={0.2} rayleigh={0.5} />
      
      <fog attach="fog" args={["#e5effa", 15, 70]} />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Skyscraper />
      </Float>

      {/* Soft Volumetric Clouds wrapped around the building */}
      <Clouds material="basic">
        <Cloud segments={20} bounds={[10, 2, 2]} volume={10} color="#ffffff" opacity={0.5} position={[-8, 8, -5]} />
        <Cloud segments={20} bounds={[10, 2, 2]} volume={10} color="#ffffff" opacity={0.4} position={[8, 12, -8]} />
        <Cloud segments={20} bounds={[10, 2, 2]} volume={10} color="#ffffff" opacity={0.3} position={[0, 18, -10]} />
        <Cloud segments={20} bounds={[20, 2, 2]} volume={15} color="#e5effa" opacity={0.8} position={[0, -2, 0]} />
      </Clouds>

      {/* Lightweight stable shadow instead of heavy ContactShadows */}
      <mesh position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[15, 32]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.15} />
      </mesh>
      
      <CameraRig />
    </Canvas>
  );
}
