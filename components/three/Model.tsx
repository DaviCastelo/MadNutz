"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useClonedScene } from "./useClonedScene";

type ModelProps = {
  url: string;
  /** Largest dimension is normalized to this many world units. */
  targetSize?: number;
  autoRotate?: boolean;
  rotateSpeed?: number;
  float?: boolean;
  floatAmplitude?: number;
};

/**
 * Renders a GLB centered at the origin and scaled to `targetSize`, regardless
 * of the source model's own units/pivot. Optional idle rotation + vertical bob.
 */
export function NormalizedModel({
  url,
  targetSize = 3,
  autoRotate = false,
  rotateSpeed = 0.4,
  float = false,
  floatAmplitude = 0.15,
}: ModelProps) {
  const scene = useClonedScene(url);

  const normalized = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    scene.position.sub(center);
    const wrap = new THREE.Group();
    wrap.add(scene);
    wrap.scale.setScalar(targetSize / maxDim);
    return wrap;
  }, [scene, targetSize]);

  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    if (autoRotate) g.rotation.y += delta * rotateSpeed;
    if (float) {
      g.position.y = Math.sin(state.clock.elapsedTime * 1.1) * floatAmplitude;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={normalized} />
    </group>
  );
}
