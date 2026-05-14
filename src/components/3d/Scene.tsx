"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, Sky } from "@react-three/drei";
import { useScroll } from "framer-motion";
import { MathUtils } from "three";
import { Skyscraper } from "./Skyscraper";

function CameraRig() {
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    // Scroll progress from 0 to 1
    const scroll = scrollYProgress.get();
    
    // Smoothly interpolate camera position based on scroll
    // Start low, looking up (hero), move up as user scrolls
    const targetY = MathUtils.lerp(2, 15, scroll);
    const targetZ = MathUtils.lerp(18, 25, scroll);
    const targetX = MathUtils.lerp(0, 10, scroll);
    
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
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#e5effa"]} />
      
      {/* Cinematic Daytime Lighting */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight 
        position={[20, 50, -20]} 
        intensity={2.5} 
        color="#fff5e6" 
        castShadow
      />
      <directionalLight 
        position={[-10, 20, 10]} 
        intensity={1} 
        color="#aaccff" 
      />

      {/* Daytime Environment */}
      <Environment preset="city" />
      <Sky sunPosition={[100, 20, -100]} turbidity={0.2} rayleigh={0.5} />
      
      <fog attach="fog" args={["#e5effa", 15, 70]} />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Skyscraper />
      </Float>

      <ContactShadows 
        position={[0, -10, 0]} 
        opacity={0.3} 
        scale={40} 
        blur={2} 
        far={10} 
        color="#0a0a0a" 
      />
      
      <CameraRig />
    </Canvas>
  );
}
