import Image from "next/image";
import { cn } from "@/lib/utils";

const MASCOT_SRC = "/assets/mascot.png";

/** Mascote oficial MadNutz (PNG). */
export function MascotImage({
  className,
  priority = false,
  fill = false,
}: {
  className?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  if (fill) {
    return (
      <Image
        src={MASCOT_SRC}
        alt="Mascote MadNutz"
        fill
        priority={priority}
        sizes="(max-width: 768px) 40vw, 320px"
        className={cn("animate-float object-contain drop-shadow-glow", className)}
      />
    );
  }

  return (
    <Image
      src={MASCOT_SRC}
      alt="Mascote MadNutz"
      width={400}
      height={438}
      priority={priority}
      className={cn("h-auto w-full animate-float object-contain drop-shadow-glow", className)}
    />
  );
}
