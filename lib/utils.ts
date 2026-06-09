import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** MadNutz WhatsApp number (E.164, no symbols) used across CTAs. */
export const WHATSAPP_NUMBER = "5585992492148";

/** Build a wa.me deep link with a URL-encoded, pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Format a number as Brazilian Real currency (e.g. R$ 24,90). */
export function brl(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const SOCIAL = {
  instagram: "https://www.instagram.com/madnutzbr/",
  tiktok: "https://www.tiktok.com/@madnutzbr",
} as const;
