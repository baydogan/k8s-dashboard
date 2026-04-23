"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ClusterEvent, EventType } from "@/entities/event";

type SortKey = "type" | "reason" | "namespace" | "count" | "lastSeen" | "age";
type SortDir = "asc" | "desc";

const LIMITS = [10, 25, 50] as const;

const TYPE_ORDER: Record<EventType, number> = { Normal: 0, Warning: 1, Critical: 2 };

const KIND_COLORS: Record<string, string> = {
  Pod: "text-accent",
  Deployment: "text-accent-info",
  Node: "text-accent-warn",
  Service: "text-accent/80",
  ReplicaSet: "text-text-muted",
  Job: "text-text-muted",
};

function parseDuration(s: string): number {
  const num = parseInt(s, 10);
  if (s.endsWith("d")) return num * 1440;
  if (s.endsWith("h")) return num * 60;
  return num;
}

function typeToVariant(type: EventType) {
  switch (type) {
    case "Normal":   return "muted" as const;
    case "Warning":  return "warning" as const;
    case "Critical": return "critical" as const;
  }
}

interface Props {
  events: ClusterEvent[];
}

export function EventsTable({ events }: Props) {
  const t = useTranslations("events");
  const [sortKey, setSortKey] = useState<SortKey>("lastSeen");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [limit, setLimit] = useState<number | null>(25);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = useMemo(() => {
    return [...events].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "type":
          cmp = TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
          break;
        case "reason":
          cmp = a.reason.localeCompare(b.reason);
          break;
        case "namespace":
          cmp = a.namespace.localeCompare(b.namespace);
          break;
        case "count":
          cmp = a.count - b.count;
          break;
        case "lastSeen":
          cmp = parseDuration(a.lastSeen) - parseDuration(b.lastSeen);
          break;
        case "age":
          cmp = parseDuration(a.age) - parseDuration(b.age);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [events, sortKey, sortDir]);

  const displayed = limit === null ? sorted : sorted.slice(0, limit);

  const columns: { key: SortKey | null; label: string }[] = [
    { key: "type",      label: t("columns.type") },
    { key: "reason",    label: t("columns.reason") },
    { key: null,        label: t("columns.object") },
    { key: "namespace", label: t("columns.namespace") },
    { key: null,        label: t("columns.message") },
    { key: "count",     label: t("columns.count") },
    { key: "lastSeen",  label: t("columns.lastSeen") },
    { key: "age",       label: t("columns.age") },
    { key: null,        label: "" },
  ];

  return (
    <div className="space-y-3">
      {/* Limit selector */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-text-dim tracking-wider uppercase">
          {t("table.showing", { shown: displayed.length, total: events.length })}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider mr-1">
            {t("table.show")}
          </span>
          {LIMITS.map((n) => (
            <button
              key={n}
              onClick={() => setLimit(n)}
              className={`h-6 min-w-[28px] px-2 font-mono text-[11px] rounded border transition-colors ${
                limit === n
                  ? "bg-accent/15 border-accent/30 text-accent"
                  : "bg-transparent border-border text-text-dim hover:text-text hover:border-border/80"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setLimit(null)}
            className={`h-6 px-2 font-mono text-[11px] rounded border transition-colors ${
              limit === null
                ? "bg-accent/15 border-accent/30 text-accent"
                : "bg-transparent border-border text-text-dim hover:text-text hover:border-border/80"
            }`}
          >
            {t("table.all")}
          </button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                {columns.map((col, i) =>
                  col.key ? (
                    <th
                      key={i}
                      className="px-4 py-3 text-[10px] font-mono tracking-[0.15em] text-text-dim uppercase font-normal"
                    >
                      <button
                        onClick={() => handleSort(col.key!)}
                        className="flex items-center gap-1 hover:text-text transition-colors"
                      >
                        {col.label}
                        <span className="text-text-dim/60">
                          {sortKey === col.key ? (
                            sortDir === "asc" ? (
                              <ChevronUp className="h-3 w-3 text-accent" />
                            ) : (
                              <ChevronDown className="h-3 w-3 text-accent" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3 w-3" />
                          )}
                        </span>
                      </button>
                    </th>
                  ) : (
                    <th
                      key={i}
                      className="px-4 py-3 text-[10px] font-mono tracking-[0.15em] text-text-dim uppercase font-normal"
                    >
                      {col.label}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayed.map((event, i) => (
                <tr
                  key={`${event.involvedObject}-${event.reason}-${i}`}
                  className="hover:bg-bg-sunken/50 transition-colors group cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <td className="px-4 py-3">
                    <Badge variant={typeToVariant(event.type)}>
                      {t(`type.${event.type.toLowerCase() as "normal" | "warning" | "critical"}`)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-text">{event.reason}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-mono text-[10px] ${KIND_COLORS[event.objectKind] ?? "text-text-dim"}`}>
                        {event.objectKind}
                      </span>
                      <span className="text-text-dim/40 font-mono text-[10px]">/</span>
                      <span
                        className="font-mono text-xs text-text-muted truncate max-w-[120px]"
                        title={event.involvedObject}
                      >
                        {event.involvedObject}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-text-muted">{event.namespace}</span>
                  </td>
                  <td className="px-4 py-3 max-w-[280px]">
                    <span
                      className="font-mono text-xs text-text-dim truncate block"
                      title={event.message}
                    >
                      {event.message}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-mono text-xs ${
                        event.count > 10
                          ? "text-accent-crit"
                          : event.count > 3
                          ? "text-accent-warn"
                          : "text-text-muted"
                      }`}
                    >
                      {event.count}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{event.lastSeen}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{event.age}</td>
                  <td className="px-4 py-3">
                    <button className="h-6 w-6 flex items-center justify-center text-text-dim hover:text-text opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
