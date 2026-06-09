import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "amber" | "ember" | "ghost";
  className?: string;
};

const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  amber: "bg-accent-primary text-white",
  ember: "bg-accent-orange text-black",
  ghost: "border border-accent-orange/40 bg-background/60 text-accent-orange backdrop-blur",
};

export function Badge({ children, variant = "amber", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
