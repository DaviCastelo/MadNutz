"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMounted } from "@/lib/hooks";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
};

/**
 * Scroll-triggered fade + slide. Renders a static, hidden placeholder on the
 * server and the first client render (byte-identical → no hydration mismatch),
 * then hands off to framer-motion after mount. Reduced motion collapses the
 * timing to an instant reveal.
 */
export function Reveal({ children, className, delay = 0, y = 26 }: RevealProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0 : 0.6,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
