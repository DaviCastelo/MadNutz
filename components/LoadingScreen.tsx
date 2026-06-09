"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoWordmark } from "@/components/brand/LogoWordmark";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Brief branded intro overlay. Fades on window load or after a short cap,
 *  whichever comes first. Near-instant for reduced-motion users. */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const hide = () => setDone(true);
    const cap = window.setTimeout(hide, reduce ? 250 : 1200);
    window.addEventListener("load", hide);
    return () => {
      window.clearTimeout(cap);
      window.removeEventListener("load", hide);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={reduce ? {} : { scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
            >
              <LogoWordmark className="text-4xl" />
            </motion.div>
            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-edge">
              <motion.div
                initial={{ x: "-110%" }}
                animate={{ x: "210%" }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                className="h-full w-1/2 bg-accent-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
