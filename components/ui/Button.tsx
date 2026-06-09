import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wide leading-none transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-primary text-background hover:shadow-glow-strong hover:-translate-y-0.5 active:translate-y-0",
        ember:
          "bg-accent-secondary text-ink hover:shadow-ember hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-edge text-ink hover:border-accent-primary hover:text-accent-primary",
        ghost: "text-ink hover:text-accent-primary",
        whatsapp:
          "bg-[#1FAE54] text-white hover:bg-[#1b9a49] hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-lg",
        md: "h-12 px-6 text-sm rounded-xl",
        lg: "h-14 px-8 text-[15px] rounded-xl",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
