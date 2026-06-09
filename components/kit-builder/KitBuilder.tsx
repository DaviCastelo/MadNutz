"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button, buttonVariants } from "@/components/ui/Button";
import { KitTray } from "./KitTray";
import { products } from "@/data/products";
import { kitTiers, kitGross, kitNet, type KitTier } from "@/data/kits";
import { useCart } from "@/store/cart";
import { brl, cn, waLink } from "@/lib/utils";

export function KitBuilder() {
  const [tier, setTier] = useState<KitTier>(kitTiers[1]);
  const [units, setUnits] = useState<number[]>([]);
  const add = useCart((s) => s.add);

  const count = units.length;
  const remaining = tier.size - count;
  const complete = remaining === 0;
  const gross = kitGross(units);
  const net = kitNet(units, tier.discount);
  const savings = gross - net;

  const setSize = (t: KitTier) => {
    setTier(t);
    setUnits((u) => u.slice(0, t.size));
  };
  const addUnit = (id: number) =>
    setUnits((u) => (u.length < tier.size ? [...u, id] : u));
  const removeUnit = (i: number) =>
    setUnits((u) => u.filter((_, idx) => idx !== i));

  const grouped = products
    .map((p) => ({ p, n: units.filter((id) => id === p.id).length }))
    .filter((x) => x.n > 0);
  const message =
    `Olá MadNutz! Quero montar meu kit *${tier.label}* (${tier.size} unidades):\n` +
    grouped.map((g) => `• ${g.n}x ${g.p.name}`).join("\n") +
    `\n\nTotal: ${brl(net)}`;
  const addKitToCart = () =>
    grouped.forEach((g) =>
      add({ id: g.p.id, name: g.p.name, flavor: g.p.flavor, price: g.p.price }, g.n),
    );

  return (
    <Section
      id="kits"
      className="pb-28 sm:pb-24"
      eyebrow="Monte do seu jeito"
      title={
        <>
          Kit
          <br className="sm:hidden" />{" "}
          <span className="text-accent-primary">personalizado</span>
        </>
      }
      description="Escolha o tamanho, recheie com seus sabores e fecha pelo WhatsApp."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        <div className="min-w-0">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {kitTiers.map((t) => (
              <button
                key={t.size}
                type="button"
                onClick={() => setSize(t)}
                className={cn(
                  "cursor-pointer rounded-xl border p-2.5 text-center transition-colors duration-200 sm:rounded-2xl sm:p-4 sm:text-left",
                  t.size === tier.size
                    ? "border-accent-primary bg-accent-primary/10"
                    : "border-edge bg-surface hover:border-accent-orange/50",
                )}
              >
                <span className="font-display text-2xl font-extrabold leading-none text-ink sm:text-3xl">{t.size}</span>
                <span className="mt-1 block font-mono text-[8px] uppercase leading-tight tracking-[0.08em] text-accent-primary sm:mt-1.5 sm:text-[10px] sm:tracking-[0.15em]">
                  {t.label}
                </span>
                {t.discount > 0 && (
                  <span className="mt-2 inline-block rounded-full bg-accent-primary px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                    -{Math.round(t.discount * 100)}%
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-2.5">
            {products.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => addUnit(p.id)}
                disabled={complete}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-edge bg-surface p-3 text-left transition-colors duration-200 hover:border-accent-primary/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="h-10 w-10 shrink-0 rounded-lg" style={{ background: `linear-gradient(160deg, ${p.color}, ${p.color2})` }} />
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold uppercase leading-none text-ink">{p.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{p.flavor} · {brl(p.price)}</span>
                </span>
                <Plus className="h-5 w-5 text-accent-primary" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-edge bg-surface p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">Sua montagem</span>
            <span className="font-display text-xl font-extrabold text-ink">
              {count}<span className="text-ink-muted">/{tier.size}</span>
            </span>
          </div>

          <KitTray units={units} size={tier.size} onRemove={removeUnit} />

          <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
            {complete ? "Kit completo — bora fechar!" : `Faltam ${remaining} ${remaining === 1 ? "unidade" : "unidades"}`}
          </p>

          <div className="mt-5 flex items-end justify-between gap-3 border-t border-edge pt-5">
            <div>
              {savings > 0 && <span className="block font-mono text-xs text-ink-muted line-through">{brl(gross)}</span>}
              <span className="font-display text-4xl font-extrabold text-ink">{brl(net)}</span>
            </div>
            {savings > 0 && (
              <span className="rounded-full bg-accent-primary/15 px-3 py-1 font-mono text-xs font-bold text-accent-primary">
                Economiza {brl(savings)}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={complete ? waLink(message) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!complete}
              className={buttonVariants({ size: "lg", className: cn("flex-1", !complete && "pointer-events-none opacity-40") })}
            >
              Montar meu kit
            </a>
            <Button variant="outline" size="lg" onClick={addKitToCart} disabled={!complete} className="flex-1">
              À sacola
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
