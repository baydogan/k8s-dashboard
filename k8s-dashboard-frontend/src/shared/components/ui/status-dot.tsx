import { cn } from "@/shared/lib/utils";

type StatusType = "healthy" | "warning" | "critical" | "unknown" | "pending";

interface StatusDotProps {
  status: StatusType;
  pulse?: boolean;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  healthy: "bg-accent shadow-[0_0_8px_rgba(92,225,168,0.6)]",
  warning: "bg-accent-warn shadow-[0_0_8px_rgba(245,176,86,0.6)]",
  critical: "bg-accent-crit shadow-[0_0_8px_rgba(239,106,126,0.6)]",
  unknown: "bg-text-dim",
  pending: "bg-accent-info shadow-[0_0_8px_rgba(106,177,240,0.6)]",
};

export function StatusDot({ status, pulse = true, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        statusStyles[status],
        pulse && "animate-pulse-dot",
        className
      )}
    />
  );
}
