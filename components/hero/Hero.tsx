"use client";

import dynamic from "next/dynamic";
import { ArrowDown, MessageCircle } from "lucide-react";
import { use3DEnabled } from "@/lib/hooks";
import { buttonVariants } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { LogoWordmark } from "@/components/brand/LogoWordmark";
import { MascotImage } from "@/components/brand/MascotImage";
import { waLink } from "@/lib/utils";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const TICKER = ["MELHOR COMPANHIA", "CROCÂNCIA", "+ENERGIA", "ZERO TÉDIO"];

function HeroBackdrop() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <span className="absolute left-1/2 top-[42%] max-w-full -translate-x-1/2 -translate-y-1/2 select-none text-[22vw] opacity-[0.06] sm:text-[26vw]">
        <LogoWordmark className="whitespace-nowrap" />
      </span>
    </div>
  );
}

export function Hero() {
  const enabled = use3DEnabled();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-accent" />
      <div className="pointer-events-none absolute inset-0 bg-brand-warm" />
      <div className="absolute inset-0 z-0">
        {enabled ? <HeroCanvas /> : <HeroBackdrop />}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(10,10,10,0.65)_82%)]" />

      <div className="relative z-20 mx-auto flex w-full min-w-0 max-w-shell flex-1 flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-8 sm:pb-28">
        <div className="flex w-full max-w-md flex-col items-center sm:max-w-xl md:max-w-2xl">
          <Reveal delay={0.05} className="w-full">
            <span className="mx-auto inline-block max-w-full rounded-full border border-accent-primary/50 bg-accent-primary/15 px-3 py-1.5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-orange backdrop-blur sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
              Castanhas premium · Ceará
            </span>
          </Reveal>

          <Reveal delay={0.15} className="mt-6 w-full">
            <h1 className="mx-auto w-full max-w-full font-display text-[clamp(2.25rem,10vw,11rem)] font-extrabold uppercase leading-[0.88] tracking-tightest text-ink text-balance sm:leading-[0.84]">
              Só mais uma,
              <br />
              <span className="text-accent-primary">tá?</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25} className="mt-6 w-full">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted sm:text-sm sm:tracking-[0.2em]">
              99% nuts, <span className="text-accent-orange">1% malícia</span>
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-8 w-full">
            <div className="mx-auto w-44 sm:w-52 md:w-60">
              <MascotImage priority />
            </div>
          </Reveal>

          <Reveal
            delay={0.38}
            className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
          >
            <a
              href="#produtos"
              className={buttonVariants({ size: "lg", className: "flex w-full sm:inline-flex sm:w-auto" })}
            >
              Comprar agora
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={waLink("Olá MadNutz! Vim pelo site e quero garantir as minhas castanhas.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "flex w-full sm:inline-flex sm:w-auto",
              })}
            >
              <MessageCircle className="h-4 w-4" />
              Ver no WhatsApp
            </a>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 mt-auto w-full shrink-0 border-y border-accent-primary/40 bg-accent-primary py-3 sm:py-4">
        <Marquee items={TICKER} itemClassName="text-white" />
      </div>
    </section>
  );
}
