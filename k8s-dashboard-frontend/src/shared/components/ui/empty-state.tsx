import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-6 text-center",
        className
      )}
    >
      {Icon && (
        <div className="mb-6 p-4 border border-border rounded-sm bg-bg-sunken">
          <Icon className="h-8 w-8 text-text-dim" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="font-display text-lg text-text mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-text-muted max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
