"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLogo } from "./NavLogo";
import { MobileMenu } from "./MobileMenu";
import { CartButton } from "@/components/cart/CartButton";

const links = [
  { label: "Produtos", href: "#produtos" },
  { label: "Kits", href: "#kits" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={cn(
            "mx-auto flex max-w-shell items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled
              ? "border-edge bg-background/70 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <NavLogo />

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-edge bg-surface/60 text-ink backdrop-blur transition-colors hover:border-accent-primary hover:text-accent-primary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
      />
    </>
  );
}
