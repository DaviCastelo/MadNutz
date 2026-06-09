"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LogoWordmark } from "@/components/brand/LogoWordmark";
import { waLink } from "@/lib/utils";

type NavLink = { label: string; href: string };

export function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[55] flex min-h-[100dvh] flex-col overflow-x-clip bg-accent-primary px-5 pb-8 pt-5 sm:px-6 md:hidden"
        >
          <div className="flex shrink-0 items-center justify-between gap-4">
            <LogoWordmark variant="header" className="text-lg sm:text-xl" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/20 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-10 flex min-h-0 flex-1 flex-col justify-center gap-1 py-6">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.05 }}
                className="block w-full max-w-full py-2 font-display text-[clamp(1.75rem,8vw,2.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white transition-colors hover:text-white/75"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <a
            href={waLink("Olá MadNutz! Quero saber mais sobre os snacks.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex h-14 w-full shrink-0 items-center justify-center rounded-xl bg-white font-display text-[15px] font-bold uppercase tracking-wide text-accent-primary shadow-brand transition-colors hover:bg-white/90"
          >
            Falar no WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
