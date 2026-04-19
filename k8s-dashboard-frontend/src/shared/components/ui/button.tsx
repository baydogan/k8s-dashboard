import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent/10 border border-accent/40 text-accent hover:bg-accent/20 hover:border-accent/60",
  secondary:
    "bg-bg-raised border border-border text-text hover:border-border-strong",
  ghost: "text-text-muted hover:text-text hover:bg-bg-raised",
  danger:
    "bg-accent-crit/10 border border-accent-crit/40 text-accent-crit hover:bg-accent-crit/20",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-7 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-mono font-medium",
          "transition-all duration-150 rounded-sm",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
