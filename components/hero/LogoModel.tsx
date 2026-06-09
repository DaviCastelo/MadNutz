"use client";

import { NormalizedModel } from "@/components/three/Model";

/** logo.glb — continuous Y-axis auto-rotation for the hero centerpiece. */
export function LogoModel({ targetSize = 2.8 }: { targetSize?: number }) {
  return (
    <NormalizedModel
      url="/assets/logo.glb"
      targetSize={targetSize}
      autoRotate
      rotateSpeed={0.5}
    />
  );
}
