"use client";

import { useEffect, useState } from "react";

/** True only after the component has mounted on the client. Prevents
 *  hydration mismatches for anything that depends on browser-only state. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Subscribe to a media query. SSR-safe (returns `false` until mounted). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Honours the user's OS-level reduced-motion preference. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      !!(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      )
    );
  } catch {
    return false;
  }
}

/**
 * Gate for rendering WebGL/3D content. Returns `false` (use static fallback)
 * on small screens, when WebGL is unavailable, or when the user prefers
 * reduced motion — and during SSR. Only `true` once mounted and capable.
 */
export function use3DEnabled(): boolean {
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = usePrefersReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(false);

  useEffect(() => {
    setHasWebGL(detectWebGL());
  }, []);

  return mounted && isDesktop && hasWebGL && !reducedMotion;
}
