"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, type ReactNode } from "react";
import { AdaptiveDpr, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { LogoModel } from "./LogoModel";
import { MascoteModel } from "./MascoteModel";
import { Particles } from "@/components/three/Particles";
import { DRACO_PATH } from "@/components/three/useClonedScene";

/** Eases the whole scene toward the pointer for a subtle parallax tilt. */
function ParallaxRig({
  children,
  strength = 0.18,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * strength, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * strength, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 5]} intensity={2.2} color="#FFF1DC" />
        <pointLight position={[-5, -2, 3]} intensity={32} color="#E8451A" />
        <pointLight position={[4, 3, -4]} intensity={18} color="#F5A623" />
        <Particles count={160} />
        <ParallaxRig>
          <group position={[0, 0.5, -0.6]}>
            <LogoModel targetSize={3} />
          </group>
          <group position={[2.4, -1.2, 0.6]}>
            <MascoteModel targetSize={2.6} />
          </group>
        </ParallaxRig>
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/assets/logo.glb", DRACO_PATH);
useGLTF.preload("/assets/mascote.glb", DRACO_PATH);
