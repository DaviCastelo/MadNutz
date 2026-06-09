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

const tierShortLabel: Record<KitTier["size"], string> = {
  3: "Trio",
  6: "6 un.",
  12: "12 un.",
};

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

  const tierSelector = (
    <div className="grid min-w-0 grid-cols-3 gap-1.5 sm:gap-3">
      {kitTiers.map((t) => (
        <button
          key={t.size}
          type="button"
          onClick={() => setSize(t)}
          className={cn(
            "min-w-0 cursor-pointer overflow-hidden rounded-xl border p-2 text-center transition-colors duration-200 sm:rounded-2xl sm:p-4 sm:text-left",
            t.size === tier.size
              ? "border-accent-primary bg-accent-primary/10"
              : "border-edge bg-surface hover:border-accent-orange/50",
          )}
        >
          <span className="font-display text-xl font-extrabold leading-none text-ink sm:text-3xl">{t.size}</span>
          <span className="mt-1 block truncate font-mono text-[9px] uppercase leading-tight tracking-[0.06em] text-accent-primary sm:mt-1.5 sm:text-[10px] sm:tracking-[0.15em]">
            <span className="sm:hidden">{tierShortLabel[t.size]}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </span>
          {t.discount > 0 && (
            <span className="mt-1.5 inline-block rounded-full bg-accent-primary px-1.5 py-0.5 font-mono text-[9px] font-bold text-white sm:mt-2 sm:px-2 sm:text-[10px]">
              -{Math.round(t.discount * 100)}%
            </span>
          )}
        </button>
      ))}
    </div>
  );

  const flavorList = (
    <div className="space-y-2.5">
      {products.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => addUnit(p.id)}
          disabled={complete}
          className="flex w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-xl border border-edge bg-surface p-2.5 text-left transition-colors duration-200 hover:border-accent-primary/50 disabled:cursor-not-allowed disabled:opacity-40 sm:gap-3 sm:p-3"
        >
          <span
            className="h-9 w-9 shrink-0 rounded-lg sm:h-10 sm:w-10"
            style={{ background: `linear-gradient(160deg, ${p.color}, ${p.color2})` }}
          />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-display text-base font-bold uppercase leading-none text-ink sm:text-lg">
              {p.name}
            </span>
            <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted sm:text-[11px] sm:tracking-[0.12em]">
              {p.flavor} · {brl(p.price)}
            </span>
          </span>
          <Plus className="h-5 w-5 shrink-0 text-accent-primary" />
        </button>
      ))}
    </div>
  );

  const assemblyPanel = (
    <div className="min-w-0 overflow-x-clip rounded-2xl border border-edge bg-surface p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted sm:text-xs sm:tracking-[0.18em]">
          Sua montagem
        </span>
        <span className="shrink-0 font-display text-lg font-extrabold text-ink sm:text-xl">
          {count}<span className="text-ink-muted">/{tier.size}</span>
        </span>
      </div>

      <KitTray units={units} size={tier.size} onRemove={removeUnit} />

      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted sm:mt-4 sm:text-xs sm:tracking-[0.15em]">
        {complete ? "Kit completo — bora fechar!" : `Faltam ${remaining} ${remaining === 1 ? "unidade" : "unidades"}`}
      </p>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-2 border-t border-edge pt-4 sm:mt-5 sm:gap-3 sm:pt-5">
        <div className="min-w-0">
          {savings > 0 && <span className="block font-mono text-xs text-ink-muted line-through">{brl(gross)}</span>}
          <span className="font-display text-[clamp(1.75rem,8vw,2.25rem)] font-extrabold leading-none text-ink sm:text-4xl">
            {brl(net)}
          </span>
        </div>
        {savings > 0 && (
          <span className="shrink-0 rounded-full bg-accent-primary/15 px-2.5 py-1 font-mono text-[10px] font-bold text-accent-primary sm:px-3 sm:text-xs">
            Economiza {brl(savings)}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:gap-3">
        <a
          href={complete ? waLink(message) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!complete}
          className={buttonVariants({ size: "lg", className: cn("w-full flex-1 sm:w-auto", !complete && "pointer-events-none opacity-40") })}
        >
          Montar meu kit
        </a>
        <Button variant="outline" size="lg" onClick={addKitToCart} disabled={!complete} className="w-full flex-1 sm:w-auto">
          À sacola
        </Button>
      </div>
    </div>
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
      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">{tierSelector}</div>

        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">{assemblyPanel}</div>

        <div className="min-w-0 lg:col-start-1 lg:row-start-2">{flavorList}</div>
      </div>
    </Section>
  );
}
