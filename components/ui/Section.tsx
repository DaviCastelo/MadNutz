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
          "mx-auto w-full max-w-shell",
          align === "center" && "text-center",
          containerClassName,
        )}
      >
        {(eyebrow || title) && (
          <Reveal className={cn("mb-12 md:mb-16", align === "center" && "mx-auto max-w-2xl")}>
            {eyebrow && (
              <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-primary">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tightest text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-5 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg",
                  align === "center" && "mx-auto",
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
