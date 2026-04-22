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
      <p className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2.5">
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
                "flex items-center gap-2.5 px-3 py-2 rounded-md border border-border",
                "text-left text-sm text-text-muted",
                "hover:border-border-strong hover:bg-bg-sunken hover:text-text",
                "transition-all duration-150"
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-text-dim" />}
              <span>{t(p.labelKey as any)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
