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
          "h-6 w-6 shrink-0 rounded-md border flex items-center justify-center mt-0.5",
          isAssistant
            ? "bg-accent/10 border-accent/25 text-accent"
            : "bg-bg-sunken border-border text-text-muted"
        )}
      >
        {isAssistant ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
      </div>

      <div
        className={cn(
          "max-w-[85%] rounded-lg border px-3.5 py-2.5 text-sm leading-relaxed shadow-card",
          isAssistant
            ? "bg-bg-raised border-border text-text"
            : "bg-accent/8 border-accent/20 text-text"
        )}
      >
        {message.isStreaming ? (
          <span className="font-mono text-xs whitespace-pre-wrap">
            {message.content}
            <span className="cursor-blink" />
          </span>
        ) : (
          <span className="font-mono text-xs whitespace-pre-wrap">{message.content}</span>
        )}
        <p className={cn("mt-1.5 text-[10px]", isAssistant ? "text-text-dim" : "text-accent/50")}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
