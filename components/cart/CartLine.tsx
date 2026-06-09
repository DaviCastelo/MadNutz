"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import { useCart, type CartItem } from "@/store/cart";
import { brl } from "@/lib/utils";

export function CartLine({ item }: { item: CartItem }) {
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const product = products.find((p) => p.id === item.id);

  return (
    <div className="flex gap-3 rounded-xl border border-edge bg-background p-3">
      <span
        className="h-16 w-16 shrink-0 rounded-lg"
        style={{
          background: product
            ? `linear-gradient(160deg, ${product.color}, ${product.color2})`
            : "#222",
        }}
      />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-base font-bold uppercase leading-tight text-ink">
              {item.name}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
              {item.flavor}
            </p>
          </div>
          <button
            type="button"
            onClick={() => remove(item.id)}
            aria-label={`Remover ${item.name}`}
            className="cursor-pointer text-ink-muted transition-colors hover:text-accent-secondary"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center rounded-lg border border-edge">
            <button
              type="button"
              onClick={() => setQty(item.id, item.qty - 1)}
              aria-label="Diminuir quantidade"
              className="grid h-8 w-8 cursor-pointer place-items-center text-ink transition-colors hover:text-accent-primary"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center font-mono text-sm text-ink">{item.qty}</span>
            <button
              type="button"
              onClick={() => setQty(item.id, item.qty + 1)}
              aria-label="Aumentar quantidade"
              className="grid h-8 w-8 cursor-pointer place-items-center text-ink transition-colors hover:text-accent-primary"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="font-display text-lg font-extrabold text-ink">
            {brl(item.qty * item.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
