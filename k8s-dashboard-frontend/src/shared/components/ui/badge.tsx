import { cn } from "@/shared/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "critical" | "info" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-bg-sunken border-border text-text",
  success: "bg-accent/10 border-accent/25 text-accent",
  warning: "bg-accent-warn/10 border-accent-warn/25 text-accent-warn",
  critical: "bg-accent-crit/10 border-accent-crit/25 text-accent-crit",
  info: "bg-accent-info/10 border-accent-info/25 text-accent-info",
  muted: "bg-transparent border-border text-text-muted",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 h-5",
        "border text-[11px] font-medium rounded",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
