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
            className="block text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full h-10 px-3 font-mono text-sm",
            "bg-bg-sunken border border-border text-text",
            "placeholder:text-text-dim",
            "focus:outline-none focus:border-accent/60 focus:shadow-[0_0_0_1px_rgba(92,225,168,0.2)]",
            "transition-all duration-150 rounded-sm",
            error && "border-accent-crit/60",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs font-mono text-accent-crit">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
