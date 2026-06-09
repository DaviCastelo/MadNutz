"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, useGLTF } from "@react-three/drei";
import { NormalizedModel } from "./Model";
import { DRACO_PATH } from "./useClonedScene";

type ModelStageProps = {
  url: string;
  targetSize?: number;
  autoRotate?: boolean;
  rotateSpeed?: number;
  float?: boolean;
  camera?: [number, number, number];
  fov?: number;
  className?: string;
};

/** A self-contained Canvas presenting a single GLB with three-point lighting.
 *  Used by the navbar logo, the About mascote, and the 404 page. */
export default function ModelStage({
  url,
  targetSize = 3,
  autoRotate = true,
  rotateSpeed = 0.4,
  float = false,
  camera = [0, 0, 5],
  fov = 40,
  className,
}: ModelStageProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: camera, fov }}
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} color="#FFF1DC" />
        <pointLight position={[-4, -3, 2]} intensity={24} color="#E8451A" />
        <NormalizedModel
          url={url}
          targetSize={targetSize}
          autoRotate={autoRotate}
          rotateSpeed={rotateSpeed}
          float={float}
        />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/assets/logo.glb", DRACO_PATH);
useGLTF.preload("/assets/mascote.glb", DRACO_PATH);
