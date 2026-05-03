"use client";

import { useEffect, useRef, useState } from "react";
import { X, Copy, Check, RefreshCw, Terminal } from "lucide-react";
import { usePodLogs } from "@/hooks/use-pod-logs";
import { useTranslations } from "next-intl";

interface LogDrawerProps {
  clusterId: string;
  namespace: string;
  podName: string;
  containers: string[];
  onClose: () => void;
}

const TAIL_OPTIONS = [50, 100, 200, 500] as const;
type TailOption = (typeof TAIL_OPTIONS)[number];

function logLineClass(line: string): string {
  if (/\b(ERROR|FATAL|CRITICAL)\b/.test(line)) return "text-[#ff6b6b]";
  if (/\b(WARN|WARNING)\b/.test(line))          return "text-[#ffa94d]";
  if (/\b(DEBUG|TRACE)\b/.test(line))           return "text-[#6e7681]";
  return "text-[#c9d1d9]";
}

export function LogDrawer({ clusterId, namespace, podName, containers, onClose }: LogDrawerProps) {
  const [container, setContainer]   = useState(containers[0] ?? "");
  const [tailLines, setTailLines]   = useState<TailOption>(100);
  const [copied, setCopied]         = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const logRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("pods");

  const { data: logs, isLoading, refetch, isFetching } = usePodLogs(
    clusterId, namespace, podName, container, tailLines
  );

  useEffect(() => {
    if (autoScroll && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const copy = () => {
    if (!logs) return;
    navigator.clipboard.writeText(logs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 20;
    setAutoScroll(atBottom);
  };

  const lines = logs?.split("\n").filter(Boolean) ?? [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-[720px] h-full bg-[#0d1117] border-l border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#30363d] bg-[#161b22] shrink-0 min-w-0">
          <Terminal className="h-3.5 w-3.5 text-accent shrink-0" />
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <span className="font-mono text-xs text-[#6e7681] shrink-0">{namespace}/</span>
            <span className="font-mono text-xs text-[#c9d1d9] truncate">{podName}</span>
          </div>

          {containers.length > 1 && (
            <select
              value={container}
              onChange={(e) => setContainer(e.target.value)}
              className="text-xs font-mono bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-[#8b949e] focus:outline-none focus:border-accent/50 shrink-0"
            >
              {containers.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}

          <select
            value={tailLines}
            onChange={(e) => setTailLines(Number(e.target.value) as TailOption)}
            className="text-xs font-mono bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-[#8b949e] focus:outline-none focus:border-accent/50 shrink-0"
          >
            {TAIL_OPTIONS.map((n) => <option key={n} value={n}>{n} lines</option>)}
          </select>

          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={() => refetch()}
              title="Refresh"
              className={`h-7 w-7 flex items-center justify-center text-[#6e7681] hover:text-[#c9d1d9] rounded transition-colors ${isFetching ? "animate-spin" : ""}`}
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={copy}
              title="Copy all"
              className="h-7 w-7 flex items-center justify-center text-[#6e7681] hover:text-[#c9d1d9] rounded transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={onClose}
              title="Close"
              className="h-7 w-7 flex items-center justify-center text-[#6e7681] hover:text-[#c9d1d9] rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Log content */}
        <div
          ref={logRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-3 font-mono text-xs leading-5 select-text"
        >
          {isLoading ? (
            <div className="text-[#6e7681] animate-pulse px-1">{t("logs.loading")}</div>
          ) : lines.length === 0 ? (
            <div className="text-[#6e7681] px-1">{t("logs.noOutput")}</div>
          ) : (
            lines.map((line, i) => (
              <div key={i} className={`${logLineClass(line)} hover:bg-white/[0.04] px-1 rounded whitespace-pre-wrap break-all`}>
                <span className="text-[#3d444d] select-none mr-3 tabular-nums">{String(i + 1).padStart(4, " ")}</span>
                {line}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[#30363d] bg-[#161b22] shrink-0">
          <span className="font-mono text-[10px] text-[#6e7681] tabular-nums">
            {lines.length} {t("logs.lines")}
          </span>
          <button
            onClick={() => setAutoScroll((v) => !v)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="font-mono text-[10px] text-[#6e7681]">{t("logs.autoScroll")}</span>
            <div className={`w-7 h-4 rounded-full transition-colors ${autoScroll ? "bg-accent" : "bg-[#21262d] border border-[#30363d]"}`}>
              <div className={`w-3 h-3 rounded-full bg-white m-0.5 transition-transform ${autoScroll ? "translate-x-3" : "translate-x-0"}`} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
