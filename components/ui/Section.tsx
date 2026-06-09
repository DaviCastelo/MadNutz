import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  align?: "left" | "center";
};

/** Consistent section shell: padding, max-width, and an animated heading
 *  block (eyebrow + display title + description). */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
  align = "left",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative px-5 py-24 sm:px-8 md:py-32", className)}
    >
      <div
        className={cn(
          "mx-auto w-full min-w-0 max-w-shell overflow-x-clip",
          align === "center" ? "text-center" : "text-center md:text-left",
          containerClassName,
        )}
      >
        {(eyebrow || title) && (
          <Reveal
            className={cn(
              "mb-12 w-full min-w-0 md:mb-16",
              align === "center" ? "mx-auto max-w-2xl" : "mx-auto max-w-2xl md:mx-0",
            )}
          >
            {eyebrow && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent-orange sm:text-xs sm:tracking-[0.3em]">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 w-full max-w-full break-words font-display text-[clamp(1.65rem,7vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-ink text-balance sm:tracking-tighter md:text-6xl md:tracking-tightest lg:text-7xl">
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-5 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg",
                  align === "center" ? "mx-auto" : "mx-auto md:mx-0",
                )}
              >
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
