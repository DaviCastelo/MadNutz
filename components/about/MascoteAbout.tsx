import { MascotImage } from "@/components/brand/MascotImage";

/** Mascote na seção Sobre. */
export function MascoteAbout() {
  return (
    <div className="relative aspect-square w-full">
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-accent-primary/15 blur-3xl" />
      <MascotImage fill className="p-6" />
    </div>
  );
}
