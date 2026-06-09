"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Stars } from "@/components/ui/Stars";
import { Avatar } from "@/components/ui/Avatar";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/data/reviews";

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="rounded-2xl border border-edge bg-surface p-5 text-center transition-colors hover:border-accent-primary/50">
      <div className="font-display text-3xl font-extrabold text-accent-primary sm:text-5xl">
        {value}
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
        {label}
      </div>
    </div>
  );
}

export function Reviews() {
  const scroller = useRef<HTMLDivElement>(null);
  const nudge = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <Section
      id="reviews"
      eyebrow="Prova social"
      title={<>Quem provou,<br /><span className="text-accent-primary">não larga.</span></>}
    >
      <Reveal className="mb-12 grid grid-cols-3 gap-3 sm:gap-4">
        <Stat value={<CountUp to={2000} suffix="+" />} label="kits entregues" />
        <Stat value="4,9" label="nota média" />
        <Stat value={<CountUp to={98} suffix="%" />} label="voltam pra mais" />
      </Reveal>

      <div className="relative">
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r) => (
            <article
              key={r.id}
              className="flex w-[290px] shrink-0 snap-start flex-col rounded-2xl border border-edge bg-surface p-6 sm:w-[360px]"
            >
              <Quote className="h-7 w-7 text-accent-primary/40" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink">{r.text}</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar name={r.name} gradient={r.avatar} className="h-11 w-11" />
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold uppercase text-ink">{r.name}</p>
                  <p className="font-mono text-[11px] text-ink-muted">{r.location}</p>
                </div>
                <Stars rating={r.rating} className="ml-auto" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Depoimentos anteriores"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-edge text-ink transition-colors hover:border-accent-primary hover:text-accent-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Próximos depoimentos"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-edge text-ink transition-colors hover:border-accent-primary hover:text-accent-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
