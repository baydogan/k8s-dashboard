import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-text-muted mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full h-9 px-3 text-sm rounded-md",
            "bg-bg-sunken border border-border text-text",
            "placeholder:text-text-dim",
            "focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/15",
            "transition-all duration-150",
            error && "border-accent-crit/60 focus:border-accent-crit/60 focus:ring-accent-crit/15",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-accent-crit">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
