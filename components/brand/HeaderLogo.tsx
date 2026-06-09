"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const HEADER_LOGO_SRC = "/assets/madnutz-logo-header.png";

/** Logo oficial do header (PNG da marca). */
export function HeaderLogo({ className }: { className?: string }) {
  return (
    <Image
      src={HEADER_LOGO_SRC}
      alt="MadNutz"
      width={2560}
      height={922}
      priority
      className={cn("h-8 w-auto max-w-[9.5rem] object-contain object-left sm:h-9 sm:max-w-[11rem]", className)}
    />
  );
}
