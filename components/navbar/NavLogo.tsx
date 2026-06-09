"use client";

import dynamic from "next/dynamic";
import { use3DEnabled } from "@/lib/hooks";
import { LogoWordmark } from "@/components/brand/LogoWordmark";

const ModelStage = dynamic(() => import("@/components/three/ModelStage"), {
  ssr: false,
});

/** Brand lockup: spinning 3D logo (desktop + WebGL) beside the wordmark.
 *  Falls back to the wordmark alone everywhere else. */
export function NavLogo() {
  const enabled = use3DEnabled();

  return (
    <a
      href="#top"
      aria-label="MadNutz — início"
      className="group flex items-center gap-2.5"
    >
      {enabled && (
        <span className="inline-block h-10 w-10 transition-transform duration-300 group-hover:scale-110">
          <ModelStage
            url="/assets/logo.glb"
            targetSize={2.4}
            rotateSpeed={0.6}
            camera={[0, 0, 4.2]}
            fov={42}
            className="!h-10 !w-10"
          />
        </span>
      )}
      <LogoWordmark variant="header" className="text-xl tracking-tight" />
    </a>
  );
}
