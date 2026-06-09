import { cn } from "@/lib/utils";

/** Pure-CSS brand lockup in the real display font. Serves as the static
 *  fallback for logo.glb (navbar, hero, loading) and the footer mark. */
export function LogoWordmark({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      className={cn(
        "select-none font-display font-extrabold uppercase leading-none tracking-tightest",
        className,
      )}
    >
      <span className="text-ink">MAD</span>
      <span className="text-accent-primary">NUTZ</span>
    </span>
  );
}
