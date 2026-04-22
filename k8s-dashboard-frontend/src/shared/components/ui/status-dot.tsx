import { cn } from "@/shared/lib/utils";

type StatusType = "healthy" | "warning" | "critical" | "unknown" | "pending";

interface StatusDotProps {
  status: StatusType;
  pulse?: boolean;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  healthy: "bg-accent",
  warning: "bg-accent-warn",
  critical: "bg-accent-crit",
  unknown: "bg-text-dim",
  pending: "bg-accent-info",
};

export function StatusDot({ status, pulse = true, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full shrink-0",
        statusStyles[status],
        pulse && "animate-pulse-dot",
        className
      )}
    />
  );
}
