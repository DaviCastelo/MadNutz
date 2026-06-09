"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LogoWordmark } from "@/components/brand/LogoWordmark";
import { buttonVariants } from "@/components/ui/Button";
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
          className="fixed inset-0 z-[55] flex flex-col bg-background/96 px-6 pb-10 pt-6 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-between">
            <LogoWordmark className="text-xl" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-edge text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-12 flex flex-col gap-2">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.07 }}
                className="font-display text-5xl font-extrabold uppercase tracking-tightest text-ink transition-colors hover:text-accent-primary"
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
            className={buttonVariants({ variant: "primary", size: "lg", className: "mt-auto w-full" })}
          >
            Falar no WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
