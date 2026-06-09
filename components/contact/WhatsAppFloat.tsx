import { WhatsAppIcon } from "@/components/brand/icons";
import { waLink } from "@/lib/utils";

/** Always-visible floating WhatsApp button with a pulsing halo. */
export function WhatsAppFloat() {
  return (
    <a
      href={waLink("Olá MadNutz! Vim pelo site e quero falar com vocês.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1FAE54] text-white shadow-2xl shadow-black/40 transition-transform duration-200 hover:scale-110"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#1FAE54] animate-pulse-ring" />
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
