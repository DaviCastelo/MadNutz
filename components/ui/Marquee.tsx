import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
  speed?: "normal" | "fast";
  reverse?: boolean;
};

function MarqueeItems({
  items,
  itemClassName,
}: {
  items: string[];
  itemClassName?: string;
}) {
  return (
    <>
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "mx-6 inline-flex shrink-0 items-center gap-6 font-display text-lg font-extrabold uppercase tracking-tight sm:mx-7 sm:gap-7 sm:text-xl",
            itemClassName,
          )}
        >
          {item}
          <span className="text-white/70" aria-hidden>
            •
          </span>
        </span>
      ))}
    </>
  );
}

/** Seamless infinite ticker. Content is doubled so the -50% translate loops
 *  cleanly. Decorative — hidden from assistive tech. */
export function Marquee({
  items,
  className,
  itemClassName,
  speed = "normal",
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden mask-fade-x", className)}
    >
      <div
        className={cn(
          "marquee-track flex w-max flex-nowrap items-center",
          speed === "fast" ? "marquee-track-fast" : "marquee-track-slow",
          reverse && "marquee-track-reverse",
        )}
      >
        <MarqueeItems items={items} itemClassName={itemClassName} />
        <MarqueeItems items={items} itemClassName={itemClassName} />
      </div>
    </div>
  );
}
