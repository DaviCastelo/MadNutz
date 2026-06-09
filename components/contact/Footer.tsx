import { Instagram } from "lucide-react";
import { HeaderLogo } from "@/components/brand/HeaderLogo";
import { TikTokIcon, WhatsAppIcon } from "@/components/brand/icons";
import { SOCIAL, waLink } from "@/lib/utils";

const links = [
  { label: "Produtos", href: "#produtos" },
  { label: "Kits", href: "#kits" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const socials = [
  { label: "WhatsApp", href: waLink("Olá MadNutz!"), Icon: WhatsAppIcon },
  { label: "Instagram", href: SOCIAL.instagram, Icon: Instagram },
  { label: "TikTok", href: SOCIAL.tiktok, Icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-x-clip border-t border-accent-primary/30">
      <div className="bg-accent-primary py-3 text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-[11px] sm:tracking-[0.28em]">
          99% nuts · <span className="text-accent-orange">1% malícia</span>
        </p>
      </div>
      <div className="px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <div className="mx-auto min-w-0 max-w-shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="min-w-0">
              <a href="#top" aria-label="MadNutz — início" className="inline-flex max-w-full">
                <HeaderLogo className="h-9 max-w-[11rem] sm:h-10 sm:max-w-[13rem]" />
              </a>
              <p className="mt-4 max-w-xs font-mono text-sm leading-relaxed text-ink-muted">
                Snacks premium de castanha. 99% nuts, 1% malícia. Fortaleza · Brasil.
              </p>
            </div>
            <nav className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink sm:text-xs sm:tracking-[0.15em]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-edge pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-8">
            <p className="text-center font-mono text-[10px] leading-relaxed text-ink-muted sm:text-left sm:text-xs">
              © {new Date().getFullYear()} MadNutz. Todos os direitos reservados.
            </p>
            <div className="flex justify-center gap-2 sm:justify-end">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-edge text-ink-muted transition-colors hover:border-accent-primary hover:bg-accent-primary/10 hover:text-accent-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
