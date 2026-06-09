"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

function trayGridClass(size: number) {
  if (size <= 3) return "grid-cols-3";
  if (size <= 6) return "grid-cols-3 sm:grid-cols-6";
  return "grid-cols-4 sm:grid-cols-6";
}

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
    <div className={cn("grid min-w-0 gap-1.5 sm:gap-2.5", trayGridClass(size))}>
      {Array.from({ length: size }).map((_, i) => {
        const id = units[i];
        const product = id ? products.find((p) => p.id === id) : undefined;
        return (
          <div
            key={i}
            className={cn(
              "relative min-w-0 aspect-square sm:aspect-[3/4] rounded-lg sm:rounded-xl",
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
                  className="group absolute inset-0 grid cursor-pointer place-items-center overflow-hidden rounded-lg px-0.5 text-center sm:rounded-xl sm:px-1"
                  style={{ background: `linear-gradient(160deg, ${product.color}, ${product.color2})` }}
                >
                  <span className="max-w-full break-words font-display text-[8px] font-extrabold uppercase leading-[1.05] text-background sm:text-[11px]">
                    {product.name}
                  </span>
                  <span className="absolute right-0.5 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-background/40 opacity-100 sm:h-5 sm:w-5 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                    <X className="h-2.5 w-2.5 text-background sm:h-3 sm:w-3" />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
            {!product && (
              <span className="grid h-full place-items-center font-mono text-[10px] text-ink-muted/40 sm:text-xs">
                {i + 1}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
