"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { use3DEnabled } from "@/lib/hooks";

const ModelStage = dynamic(() => import("@/components/three/ModelStage"), {
  ssr: false,
});

/** mascote.glb presented in the About section, with the SVG stand-in as the
 *  mobile / no-WebGL / reduced-motion fallback. */
export function MascoteAbout() {
  const enabled = use3DEnabled();

  return (
    <div className="relative aspect-square w-full">
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-accent-primary/15 blur-3xl" />
      {enabled ? (
        <ModelStage
          url="/assets/mascote.glb"
          targetSize={3}
          rotateSpeed={0.2}
          float
          camera={[0, 0, 5.2]}
          className="!h-full !w-full"
        />
      ) : (
        <Image
          src="/assets/mascote-fallback.svg"
          alt="Mascote MadNutz"
          fill
          className="animate-float object-contain p-6 drop-shadow-glow"
        />
      )}
    </div>
  );
}
