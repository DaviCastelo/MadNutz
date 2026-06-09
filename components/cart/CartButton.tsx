"use client";

import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, selectCount } from "@/store/cart";
import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function CartButton({ className }: { className?: string }) {
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const mounted = useMounted();
  const count = mounted ? selectCount(items) : 0;

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}`}
      className={cn(
        "relative grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors duration-200 hover:border-white hover:bg-white/15",
        className,
      )}
    >
      <ShoppingBag className="h-5 w-5" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 520, damping: 24 }}
            className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-white px-1 font-mono text-[10px] font-bold leading-none text-accent-primary"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
