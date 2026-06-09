"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";

/** Additive amber cursor: a precise dot + a lagging ring that swells over
 *  interactive elements. Desktop (fine pointer) only; respects reduced motion
 *  and restores the native cursor on unmount. */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = usePrefersReducedMotion();
  const active = fine && !reduce;

  useEffect(() => {
    if (!active) return;
    document.body.classList.add("cursor-none-active");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      const hovering = !!target?.closest(
        "a, button, [role='button'], input, label, select, textarea, [data-cursor]",
      );
      if (ringRef.current) ringRef.current.dataset.hover = String(hovering);
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-none-active");
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent-primary mix-blend-screen"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-hover="false"
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent-primary/70 transition-[width,height,margin,background-color,opacity] duration-200 ease-out data-[hover=true]:-ml-7 data-[hover=true]:-mt-7 data-[hover=true]:h-14 data-[hover=true]:w-14 data-[hover=true]:border-accent-primary data-[hover=true]:bg-accent-primary/10"
      />
    </>
  );
}
