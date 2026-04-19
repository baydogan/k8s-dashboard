"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { AiMessage as AiMessageType } from "@/shared/store/ai-store";

interface AiMessageProps {
  message: AiMessageType;
}

export function AiMessage({ message }: AiMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={cn("flex gap-2.5", isAssistant ? "flex-row" : "flex-row-reverse")}>
      <div
        className={cn(
          "h-6 w-6 shrink-0 rounded-sm border flex items-center justify-center mt-0.5",
          isAssistant
            ? "bg-accent/10 border-accent/30 text-accent"
            : "bg-bg-raised border-border text-text-muted"
        )}
      >
        {isAssistant ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
      </div>

      <div
        className={cn(
          "max-w-[85%] rounded-sm border px-3 py-2.5 text-xs font-mono leading-relaxed",
          isAssistant
            ? "bg-accent/5 border-accent/20 text-text"
            : "bg-bg-raised border-border text-text"
        )}
      >
        {message.isStreaming ? (
          <span>
            {message.content}
            <span className="cursor-blink" />
          </span>
        ) : (
          <span className="whitespace-pre-wrap">{message.content}</span>
        )}
        <div
          className={cn(
            "mt-1.5 text-[9px] tracking-wider",
            isAssistant ? "text-accent/40" : "text-text-dim"
          )}
        >
          {message.timestamp.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
