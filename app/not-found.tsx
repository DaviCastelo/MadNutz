import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { MascoteAbout } from "@/components/about/MascoteAbout";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="w-52 sm:w-64">
          <MascoteAbout />
        </div>
        <p className="mt-2 font-mono text-sm font-bold uppercase tracking-[0.3em] text-accent-primary">
          Erro 404
        </p>
        <h1 className="mt-4 font-display text-6xl font-extrabold uppercase leading-[0.9] tracking-tightest text-ink sm:text-8xl">
          Essa castanha
          <br />
          <span className="text-accent-primary">sumiu.</span>
        </h1>
        <p className="mt-5 max-w-md text-ink-muted">
          A página que você procura não existe (ou já foi devorada). Bora voltar
          pra onde ainda tem comida?
        </p>
        <Link href="/" className={buttonVariants({ size: "lg", className: "mt-8" })}>
          Voltar pro início
        </Link>
      </div>
    </main>
  );
}
