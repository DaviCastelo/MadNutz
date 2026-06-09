"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/brand/icons";
import { CartLine } from "./CartLine";
import { useCart, selectSubtotal, selectCount } from "@/store/cart";
import { brl, waLink } from "@/lib/utils";

export function CartDrawer() {
  const items = useCart((s) => s.items);
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const clear = useCart((s) => s.clear);

  const subtotal = selectSubtotal(items);
  const count = selectCount(items);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const message =
    "Olá MadNutz! Quero finalizar meu pedido:\n" +
    items.map((i) => `• ${i.qty}x ${i.name} (${i.flavor}) — ${brl(i.qty * i.price)}`).join("\n") +
    `\n\nTotal: ${brl(subtotal)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Sua sacola"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col border-l border-edge bg-surface"
          >
            <header className="flex items-center justify-between border-b border-edge p-5">
              <h2 className="font-display text-2xl font-extrabold uppercase text-ink">
                Sacola
                {count > 0 && <span className="text-accent-primary"> ({count})</span>}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar sacola"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-edge text-ink transition-colors hover:border-accent-primary hover:text-accent-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-edge" />
                <p className="font-display text-xl font-bold uppercase text-ink">Sacola vazia</p>
                <p className="max-w-[15rem] text-sm text-ink-muted">
                  Bora resolver isso? Os sabores estão logo ali.
                </p>
                <a
                  href="#produtos"
                  onClick={close}
                  className={buttonVariants({ variant: "outline", size: "md", className: "mt-2" })}
                >
                  Ver produtos
                </a>
              </div>
            ) : (
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {items.map((i) => (
                  <CartLine key={i.id} item={i} />
                ))}
              </div>
            )}

            {items.length > 0 && (
              <footer className="space-y-4 border-t border-edge p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm uppercase tracking-[0.15em] text-ink-muted">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl font-extrabold text-ink">{brl(subtotal)}</span>
                </div>
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className={buttonVariants({ variant: "whatsapp", size: "lg", className: "w-full" })}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Finalizar pelo WhatsApp
                </a>
                <button
                  type="button"
                  onClick={clear}
                  className="w-full cursor-pointer text-center font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-accent-secondary"
                >
                  Esvaziar sacola
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
