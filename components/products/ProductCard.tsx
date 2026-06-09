"use client";

import { useRef, useState, type MouseEvent } from "react";
import { Check, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Packshot } from "./Packshot";
import { useCart } from "@/store/cart";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { brl, cn } from "@/lib/utils";
import type { Product } from "@/data/products";

function IntensityMeter({ value }: { value: number }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        Intensidade
      </span>
      <div className="flex gap-1" role="img" aria-label={`Intensidade ${value} de 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn("h-1.5 w-4 rounded-full", i < value ? "bg-accent-primary" : "bg-edge")}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [added, setAdded] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
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

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      className="group relative flex h-full flex-col rounded-2xl border border-edge bg-surface p-5 transition-[transform,border-color,box-shadow] duration-200 [transform-style:preserve-3d] hover:border-accent-primary/50 hover:shadow-glow"
    >
      {product.badge && (
        <Badge
          variant={product.badge === "Novo" ? "ember" : "amber"}
          className="absolute right-4 top-4 z-10"
        >
          {product.badge}
        </Badge>
      )}

      <div className="relative mx-auto mb-3 w-36 [transform:translateZ(45px)]">
        <div
          className="absolute inset-4 -z-10 rounded-full opacity-40 blur-2xl"
          style={{ background: product.color }}
        />
        <Packshot product={product} className="w-full drop-shadow-2xl" />
      </div>

      <div className="flex flex-1 flex-col [transform:translateZ(20px)]">
        <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
          {product.name}
        </h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-accent-primary">
          {product.flavor}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{product.description}</p>
        <IntensityMeter value={product.intensity} />

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="font-display text-2xl font-extrabold text-ink">{brl(product.price)}</span>
          <Button size="sm" onClick={onAdd} aria-label={`Adicionar ${product.name} ao carrinho`}>
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {added ? "Na sacola" : "Adicionar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
