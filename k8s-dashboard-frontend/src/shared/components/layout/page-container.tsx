import { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

export function PageContainer({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto px-6 py-5 animate-fade-in",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
