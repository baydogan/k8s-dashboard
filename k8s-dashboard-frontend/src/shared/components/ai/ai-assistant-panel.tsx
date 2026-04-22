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
        style={{ background: "rgba(10, 11, 16, 0.65)" }}
        onClick={closePanel}
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[440px] max-w-full",
          "flex flex-col border-l border-border bg-bg-raised",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-12 shrink-0 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-md border border-accent/25 bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text">{t("title")}</p>
              <p className="text-[10px] text-text-dim">{t("subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {!isEmpty && (
              <button
                onClick={clearMessages}
                title={t("clearTitle")}
                className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-text-muted hover:text-text hover:border-border-strong transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              onClick={closePanel}
              className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-text-muted hover:text-text hover:border-border-strong transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isEmpty ? (
            <>
              <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                <div className="h-12 w-12 rounded-xl border border-border bg-bg-sunken shadow-card flex items-center justify-center mb-4">
                  <Bot className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-text mb-1">{t("emptyTitle")}</p>
                <p className="text-sm text-text-muted">{t("emptySubtitle")}</p>
              </div>
              <AiSuggestedPrompts onSelect={(q) => sendMessage(q)} />
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <AiMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="shrink-0 border-t border-border">
          {!isEmpty && <AiSuggestedPrompts onSelect={(q) => sendMessage(q)} />}
          <div className="p-3">
            <div className="flex items-end gap-2 border border-border rounded-lg bg-bg-sunken focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/10 transition-all px-3 py-2.5">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("placeholder")}
                rows={1}
                disabled={localLoading}
                className="flex-1 bg-transparent text-sm text-text placeholder:text-text-dim resize-none outline-none leading-relaxed disabled:opacity-50"
                style={{ maxHeight: "120px" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || localLoading}
                className={cn(
                  "shrink-0 h-7 w-7 flex items-center justify-center rounded-md transition-all",
                  input.trim() && !localLoading
                    ? "bg-accent/15 border border-accent/35 text-accent hover:bg-accent/25"
                    : "bg-bg-raised border border-border text-text-dim cursor-not-allowed"
                )}
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-2 text-[10px] text-text-dim text-center">{t("mockDataNote")}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
