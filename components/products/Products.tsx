"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "./ProductCard";
import { products, categories, type Category } from "@/data/products";
import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Products() {
  const [active, setActive] = useState<Category>("Todos");
  const mounted = useMounted();

  const filtered = useMemo(
    () => (active === "Todos" ? products : products.filter((p) => p.category === active)),
    [active],
  );

  return (
    <Section
      id="produtos"
      eyebrow="O cardápio"
      title={
        <>
          Escolha seu
          <br />
          <span className="text-accent-primary">vício.</span>
        </>
      }
      description="Quatro sabores, zero meio-termo. Cada embalagem é uma decisão difícil."
    >
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200",
              active === c
                ? "border-accent-primary bg-accent-primary text-background"
                : "border-edge text-ink-muted hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={mounted ? { opacity: 0, scale: 0.94 } : false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
