import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
  speed?: "normal" | "fast";
  reverse?: boolean;
};

/** Seamless infinite ticker. Content is doubled so the -50% translate loops
 *  cleanly. Decorative — hidden from assistive tech. */
export function Marquee({
  items,
  className,
  itemClassName,
  speed = "normal",
  reverse = false,
}: MarqueeProps) {
  const loop = [...items, ...items];
  return (
    <div
      aria-hidden
      className={cn("relative flex overflow-hidden mask-fade-x", className)}
    >
      <div
        className={cn(
          "flex shrink-0 items-center whitespace-nowrap",
          speed === "fast" ? "animate-marquee-fast" : "animate-marquee",
        )}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className={cn(
              "mx-7 inline-flex items-center gap-7 font-display text-xl font-extrabold uppercase tracking-tight",
              itemClassName,
            )}
          >
            {item}
            <span className="text-accent-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
