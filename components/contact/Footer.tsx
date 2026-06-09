import { Instagram } from "lucide-react";
import { LogoWordmark } from "@/components/brand/LogoWordmark";
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
    <footer className="relative border-t border-accent-primary/30">
      <div className="bg-accent-primary py-3 text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white">
          99% nuts · <span className="text-accent-orange">1% malícia</span>
        </p>
      </div>
      <div className="px-5 pb-10 pt-16 sm:px-8">
        <div className="mx-auto max-w-shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <LogoWordmark className="text-5xl sm:text-6xl" />
            <p className="mt-4 max-w-xs font-mono text-sm leading-relaxed text-ink-muted">
              Snacks premium de castanha. 99% nuts, 1% malícia. Fortaleza · Brasil.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-edge pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-ink-muted">
            © {new Date().getFullYear()} MadNutz. Todos os direitos reservados.
          </p>
          <div className="flex gap-2">
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
