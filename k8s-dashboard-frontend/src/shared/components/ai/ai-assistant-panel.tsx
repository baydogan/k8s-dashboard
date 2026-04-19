"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, RotateCcw, Sparkles, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { useAiStore } from "@/shared/store/ai-store";
import { MOCK_AI_RESPONSES } from "@/mocks/data/ai";
import { AiMessage } from "./ai-message";
import { AiSuggestedPrompts } from "./ai-suggested-prompts";

function getMockResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("cpu")) return MOCK_AI_RESPONSES.cpu;
  if (q.includes("memory") || q.includes("mem")) return MOCK_AI_RESPONSES.memory;
  if (q.includes("event")) return MOCK_AI_RESPONSES.events;
  if (q.includes("service") || q.includes("network") || q.includes("endpoint"))
    return MOCK_AI_RESPONSES.network;
  return MOCK_AI_RESPONSES.default;
}

export function AiAssistantPanel() {
  const t = useTranslations("ai.panel");
  const { isOpen, closePanel, messages, clearMessages } = useAiStore();
  const [input, setInput] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(query: string) {
    if (!query.trim() || localLoading) return;
    setInput("");
    setLocalLoading(true);

    useAiStore.setState((s) => ({
      messages: [
        ...s.messages,
        { id: crypto.randomUUID(), role: "user", content: query, timestamp: new Date() },
      ],
    }));

    // Simulate streaming response
    const responseText = getMockResponse(query);
    const streamId = crypto.randomUUID();

    useAiStore.setState((s) => ({
      messages: [
        ...s.messages,
        { id: streamId, role: "assistant", content: "", timestamp: new Date(), isStreaming: true },
      ],
    }));

    let displayed = "";
    for (let i = 0; i < responseText.length; i++) {
      await new Promise((r) => setTimeout(r, 12));
      displayed += responseText[i];
      useAiStore.setState((s) => ({
        messages: s.messages.map((m) =>
          m.id === streamId ? { ...m, content: displayed } : m
        ),
      }));
    }

    useAiStore.setState((s) => ({
      messages: s.messages.map((m) =>
        m.id === streamId ? { ...m, isStreaming: false } : m
      ),
    }));

    setLocalLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "rgba(6,10,14,0.6)" }}
        onClick={closePanel}
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[420px] max-w-full",
          "flex flex-col border-l border-border bg-bg-raised",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-sm border border-accent/30 bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
            </div>
            <div>
              <p className="text-xs font-mono font-medium text-text">{t("title")}</p>
              <p className="text-[9px] font-mono tracking-[0.15em] text-text-dim">
                {t("subtitle")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEmpty && (
              <button
                onClick={clearMessages}
                title={t("clearTitle")}
                className="h-7 w-7 flex items-center justify-center rounded-sm border border-border text-text-muted hover:text-text hover:border-border-strong transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              onClick={closePanel}
              className="h-7 w-7 flex items-center justify-center rounded-sm border border-border text-text-muted hover:text-text hover:border-border-strong transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isEmpty ? (
            <>
              {/* Empty state */}
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <div className="h-12 w-12 rounded-sm border border-accent/30 bg-accent/5 flex items-center justify-center mb-4">
                  <Bot className="h-5 w-5 text-accent" />
                </div>
                <p className="text-xs font-mono text-text mb-1">
                  {t("emptyTitle")}
                </p>
                <p className="text-[10px] font-mono text-text-dim">
                  {t("emptySubtitle")}
                </p>
              </div>
              <AiSuggestedPrompts onSelect={(q) => sendMessage(q)} />
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <AiMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-border p-3">
          {!isEmpty && (
            <div className="mb-2">
              <AiSuggestedPrompts onSelect={(q) => sendMessage(q)} />
            </div>
          )}
          <div className="relative flex items-end gap-2 border border-border rounded-sm bg-bg-sunken focus-within:border-accent/40 transition-colors px-3 py-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              rows={1}
              disabled={localLoading}
              className="flex-1 bg-transparent text-xs font-mono text-text placeholder:text-text-dim resize-none outline-none leading-relaxed disabled:opacity-50"
              style={{ maxHeight: "120px" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || localLoading}
              className={cn(
                "shrink-0 h-6 w-6 flex items-center justify-center rounded-sm transition-all",
                input.trim() && !localLoading
                  ? "bg-accent/20 border border-accent/40 text-accent hover:bg-accent/30"
                  : "bg-bg-raised border border-border text-text-dim cursor-not-allowed"
              )}
            >
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
          <p className="mt-1.5 text-[9px] font-mono text-text-dim text-center">
            {t("mockDataNote")}
          </p>
        </div>
      </aside>
    </>
  );
}
