"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

export function Logo({ className, showTag = true }: { className?: string; showTag?: boolean }) {
  const t = useTranslations("logo");

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative shrink-0">
        <div className="w-5 h-5 border-2 border-accent rotate-45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-accent rounded-full" />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-semibold text-sm tracking-wide text-text">K8S.OBSERVER</span>
        {showTag && (
          <span className="font-mono text-[9px] tracking-wider text-text-dim mt-0.5">
            {t("tag")}
          </span>
        )}
      </div>
    </div>
  );
}
