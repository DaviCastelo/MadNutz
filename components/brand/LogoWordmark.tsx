import { cn } from "@/lib/utils";

/** Pure-CSS brand lockup in the real display font. Serves as the static
 *  fallback for logo.glb (navbar, hero, loading) and the footer mark. */
export function LogoWordmark({
  className,
  variant = "default",
}: {
  className?: string;
  /** Header lockup: MAD branco + NUTZ laranja sobre fundo vermelho. */
  variant?: "default" | "header";
}) {
  return (
    <span
      className={cn(
        "select-none font-display font-extrabold uppercase leading-none tracking-tightest",
        className,
      )}
    >
      <span className={variant === "header" ? "text-white" : "text-ink"}>MAD</span>
      <span className={variant === "header" ? "text-accent-orange" : "text-accent-primary"}>
        NUTZ
      </span>
    </span>
  );
}
