import { cn } from "@/lib/utils";

/** Initials avatar on a brand gradient — avoids stock photos while still
 *  giving each testimonial a distinct face. */
export function Avatar({
  name,
  gradient,
  className,
}: {
  name: string;
  gradient: [string, string];
  className?: string;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-display text-sm font-extrabold text-background ring-2 ring-edge",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
      }}
    >
      {initials}
    </div>
  );
}
