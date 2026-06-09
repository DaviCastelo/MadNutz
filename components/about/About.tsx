import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { MascoteAbout } from "./MascoteAbout";

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{value}</div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
        {label}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-accent-orange/15 blur-3xl" />
      <div className="mx-auto grid w-full max-w-shell items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal y={40} className="order-2 lg:order-1">
          <MascoteAbout />
        </Reveal>

        <div className="order-1 text-center lg:order-2 lg:text-left">
          <Reveal>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-orange">
              Sobre a MadNutz
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tightest text-ink sm:text-5xl md:text-6xl">
              Castanha não é
              <br />
              hobby. É <span className="text-accent-primary">vício.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-ink-muted md:text-lg">
              A MadNutz nasceu da implicância com snack sem graça. Castanha de
              verdade, torra na medida e sabor que não pede desculpa. Cada lote é
              uma provocação: você abre achando que come uma, e o pacote inteiro
              evapora.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Sem meio-termo, sem enrolação. 99% nuts, 1% malícia — e 100% da
              vontade de comer só mais uma.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid grid-cols-3 gap-4 border-t border-edge pt-8 sm:gap-6">
            <Stat value="2022" label="quando começou" />
            <Stat value={<CountUp to={4} />} label="sabores no catálogo" />
            <Stat value={<CountUp to={100} suffix="%" />} label="castanha premium" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
