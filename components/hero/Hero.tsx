"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";
import { use3DEnabled } from "@/lib/hooks";
import { buttonVariants } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { LogoWordmark } from "@/components/brand/LogoWordmark";
import { waLink } from "@/lib/utils";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const TICKER = ["MELHOR COMPANHIA", "CROCÂNCIA", "+ENERGIA", "ZERO TÉDIO"];

function HeroFallback() {
  return (
    <div className="relative h-full w-full">
      <span className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[26vw] opacity-[0.06]">
        <LogoWordmark />
      </span>
      <Image
        src="/assets/mascote-fallback.svg"
        alt="Mascote MadNutz"
        width={300}
        height={340}
        priority
        className="absolute bottom-24 right-3 w-36 animate-float drop-shadow-glow sm:bottom-28 sm:right-10 sm:w-52"
      />
    </div>
  );
}

export function Hero() {
  const enabled = use3DEnabled();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-accent" />
      <div className="absolute inset-0 z-0">{enabled ? <HeroCanvas /> : <HeroFallback />}</div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(10,10,10,0.72)_78%)]" />

      <div className="relative z-20 mx-auto flex w-full max-w-shell flex-1 flex-col items-center justify-center px-5 pb-28 pt-32 text-center sm:px-8">
        <Reveal delay={0.05}>
          <span className="inline-block rounded-full border border-edge bg-background/50 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent-primary backdrop-blur">
            Castanhas premium · Ceará
          </span>
        </Reveal>

        <Reveal delay={0.15} className="mt-6">
          <h1 className="font-display text-[clamp(3.5rem,13vw,11rem)] font-extrabold uppercase leading-[0.84] tracking-tightest text-ink">
            Só mais uma,
            <br />
            <span className="text-accent-primary">tá?</span>
          </h1>
        </Reveal>

        <Reveal delay={0.25} className="mt-6">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-ink-muted sm:text-base">
            99% nuts, <span className="text-accent-secondary">1% malícia</span>
          </p>
        </Reveal>

        <Reveal
          delay={0.35}
          className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <a href="#produtos" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}>
            Comprar agora
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href={waLink("Olá MadNutz! Vim pelo site e quero garantir as minhas castanhas.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto" })}
          >
            <MessageCircle className="h-4 w-4" />
            Ver no WhatsApp
          </a>
        </Reveal>
      </div>

      <div className="relative z-20 border-y border-edge bg-background/50 py-4 backdrop-blur-sm">
        <Marquee items={TICKER} itemClassName="text-ink" />
      </div>
    </section>
  );
}
