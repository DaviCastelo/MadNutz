"use client";

import { NormalizedModel } from "@/components/three/Model";

/** mascote.glb — gentle vertical bob + slow sway for personality. */
export function MascoteModel({ targetSize = 3.2 }: { targetSize?: number }) {
  return (
    <NormalizedModel
      url="/assets/mascote.glb"
      targetSize={targetSize}
      float
      floatAmplitude={0.18}
      autoRotate
      rotateSpeed={0.12}
    />
  );
}
