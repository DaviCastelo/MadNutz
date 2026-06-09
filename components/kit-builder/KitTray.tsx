"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

/** The assembly area: a slot per kit unit. Filled slots spring in (units
 *  "jump" into the box) and can be removed with a click. */
export function KitTray({
  units,
  size,
  onRemove,
}: {
  units: number[];
  size: number;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
      {Array.from({ length: size }).map((_, i) => {
        const id = units[i];
        const product = id ? products.find((p) => p.id === id) : undefined;
        return (
          <div
            key={i}
            className={cn(
              "relative aspect-[3/4] rounded-xl",
              product ? "" : "border border-dashed border-edge",
            )}
          >
            <AnimatePresence>
              {product && (
                <motion.button
                  type="button"
                  onClick={() => onRemove(i)}
                  initial={{ scale: 0, y: -34, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 440, damping: 24 }}
                  aria-label={`Remover ${product.name}`}
                  className="group absolute inset-0 grid cursor-pointer place-items-center overflow-hidden rounded-xl px-1 text-center"
                  style={{ background: `linear-gradient(160deg, ${product.color}, ${product.color2})` }}
                >
                  <span className="font-display text-[11px] font-extrabold uppercase leading-tight text-background">
                    {product.name}
                  </span>
                  <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <X className="h-3 w-3 text-background" />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
            {!product && (
              <span className="grid h-full place-items-center font-mono text-xs text-ink-muted/40">
                {i + 1}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
