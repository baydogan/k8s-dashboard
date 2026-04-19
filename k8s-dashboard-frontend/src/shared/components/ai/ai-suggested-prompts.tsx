"use client";

import { Cpu, AlertTriangle, Activity, Network, MemoryStick, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { MOCK_AI_SUGGESTED_PROMPTS } from "@/mocks/data/ai";

const ICON_MAP: Record<string, LucideIcon> = {
  AlertTriangle,
  Cpu,
  MemoryStick,
  Activity,
  Network,
};

interface AiSuggestedPromptsProps {
  onSelect: (query: string) => void;
}

export function AiSuggestedPrompts({ onSelect }: AiSuggestedPromptsProps) {
  const t = useTranslations("ai.panel");

  return (
    <div className="px-4 py-3 border-b border-border">
      <p className="text-[9px] font-mono tracking-[0.2em] text-text-dim mb-2">
        {t("suggestedQueries")}
      </p>
      <div className="flex flex-col gap-1.5">
        {MOCK_AI_SUGGESTED_PROMPTS.map((p) => {
          const Icon = ICON_MAP[p.icon];
          return (
            <button
              key={p.labelKey}
              onClick={() => onSelect(p.query)}
              className={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-sm border border-border",
                "text-left text-[10px] font-mono text-text-muted",
                "hover:border-accent/30 hover:bg-accent/5 hover:text-text",
                "transition-all duration-150"
              )}
            >
              {Icon && <Icon className="h-3 w-3 shrink-0 text-accent/60" />}
              <span>{t(p.labelKey as any)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
