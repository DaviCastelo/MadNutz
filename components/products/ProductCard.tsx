"use client";

import { useRef, useState, type MouseEvent } from "react";
import { Check, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Packshot } from "./Packshot";
import { useCart } from "@/store/cart";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { brl, cn } from "@/lib/utils";
import type { Product } from "@/data/products";

function IntensityMeter({ value }: { value: number }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
        Intensidade
      </span>
      <div className="flex gap-1" role="img" aria-label={`Intensidade ${value} de 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn("h-1.5 w-3.5 rounded-full sm:w-4", i < value ? "bg-accent-primary" : "bg-edge")}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const reduce = usePrefersReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [added, setAdded] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !finePointer || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 10 });
  };

  const onAdd = () => {
    add({ id: product.id, name: product.name, flavor: product.flavor, price: product.price });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const tiltStyle =
    finePointer && !reduce
      ? { transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }
      : undefined;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={tiltStyle}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-surface px-5 py-5 pb-6 transition-[transform,border-color,box-shadow] duration-200 sm:px-6 sm:py-6 sm:pb-7 [transform-style:preserve-3d] hover:border-accent-primary/50 hover:shadow-glow"
    >
      {product.badge && (
        <Badge
          variant={product.badge === "Novo" ? "ember" : "amber"}
          className="absolute right-4 top-4 z-20"
        >
          {product.badge}
        </Badge>
      )}

      <div className="relative mx-auto mb-4 w-full max-w-[8.5rem] sm:max-w-[9rem]">
        <div
          className="absolute inset-4 -z-10 rounded-full opacity-40 blur-2xl"
          style={{ background: product.color }}
        />
        <Packshot product={product} className="w-full drop-shadow-2xl" />
      </div>

      <div className="flex flex-1 flex-col text-center sm:text-left">
        <h3 className="font-display text-xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-2xl">
          {product.name}
        </h3>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-orange sm:text-xs sm:tracking-[0.15em]">
          {product.flavor}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{product.description}</p>
        <IntensityMeter value={product.intensity} />

        <div className="mt-auto border-t border-edge/80 pt-5">
          <div className="flex flex-col gap-3">
            <span className="text-center font-display text-xl font-extrabold text-ink sm:text-left sm:text-2xl">
              {brl(product.price)}
            </span>
            <Button
              size="sm"
              onClick={onAdd}
              aria-label={`Adicionar ${product.name} ao carrinho`}
              className="w-full"
            >
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {added ? "Na sacola" : "Adicionar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
