"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { Object3D } from "three";

/** Self-hosted Draco decoder path (see public/draco/). Avoids relying on
 *  Google's CDN at runtime — the optimized GLBs use Draco compression. */
export const DRACO_PATH = "/draco/";

/**
 * Load a GLB and return a deep clone of its scene. Cloning (via SkeletonUtils
 * so skinned meshes keep correct skeleton bindings) lets the same model be
 * rendered in several Canvases at once — useGLTF caches the fetch by URL, so
 * the heavy file is only downloaded once.
 */
export function useClonedScene(url: string): Object3D {
  const { scene } = useGLTF(url, DRACO_PATH);
  return useMemo(() => cloneSkeleton(scene), [scene]);
}
