import { cn } from "@/shared/lib/utils";

export function Logo({ className, showTag = true }: { className?: string; showTag?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="w-5 h-5 border-2 border-accent rotate-45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-accent rounded-full" />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-semibold text-sm tracking-[0.15em] text-text">
          K8S.OBSERVER
        </span>
        {showTag && (
          <span className="font-mono text-[9px] tracking-[0.2em] text-text-dim mt-0.5">
            v0.1 · CLUSTER OPS
          </span>
        )}
      </div>
    </div>
  );
}
