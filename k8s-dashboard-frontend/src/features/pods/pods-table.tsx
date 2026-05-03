"use client";

import { useState, useMemo } from "react";
import { TableToolbar } from "@/shared/components/ui/table-toolbar";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { MoreHorizontal, ScrollText } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Pod, PodStatus } from "@/entities/pod";
import { LogDrawer } from "./log-drawer";

function statusToVariant(s: PodStatus) {
  switch (s) {
    case "Running":
    case "Succeeded":       return "success"  as const;
    case "Pending":         return "info"     as const;
    case "Failed":
    case "CrashLoopBackOff": return "critical" as const;
    default:                return "muted"    as const;
  }
}

function statusToDot(s: PodStatus): "healthy" | "warning" | "critical" | "pending" | "unknown" {
  switch (s) {
    case "Running":
    case "Succeeded":       return "healthy";
    case "Pending":         return "pending";
    case "Failed":
    case "CrashLoopBackOff": return "critical";
    default:                return "unknown";
  }
}

interface LogTarget { name: string; namespace: string; containers: string[] }

export function PodsTable({ items, clusterId }: { items: Pod[]; clusterId: string }) {
  const [search, setSearch] = useState("");
  const [ns, setNs] = useState("");
  const [logTarget, setLogTarget] = useState<LogTarget | null>(null);
  const t = useTranslations("pods");
  const tc = useTranslations("common");

  const namespaces = useMemo(() => [...new Set(items.map((i) => i.namespace))].sort(), [items]);

  const filtered = useMemo(() =>
    items.filter((item) => {
      const q = search.toLowerCase();
      const match = !q || item.name.toLowerCase().includes(q) || item.namespace.toLowerCase().includes(q) || item.nodeName.toLowerCase().includes(q);
      return match && (!ns || item.namespace === ns);
    }),
  [items, search, ns]);

  const headers = [t("columns.name"), t("columns.namespace"), t("columns.status"), t("columns.ready"), t("columns.restarts"), t("columns.node"), t("columns.age"), ""];

  return (
    <>
      <TableToolbar search={search} onSearch={setSearch} namespace={ns} onNamespace={setNs} namespaces={namespaces} totalCount={items.length} filteredCount={filtered.length} />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                {headers.map((h, i) => <th key={i} className="px-4 py-3 text-[10px] font-mono tracking-[0.15em] text-text-dim uppercase font-normal">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center font-mono text-xs text-text-dim">{search ? tc("noResults", { query: search }) : tc("noItems")}</td></tr>
              ) : filtered.map((item, i) => (
                <tr key={`${item.namespace}/${item.name}`} className="hover:bg-bg-sunken/50 transition-colors group cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <StatusDot status={statusToDot(item.status)} pulse={item.status === "Running"} />
                      <span className="font-mono text-xs text-text">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.namespace}</td>
                  <td className="px-4 py-3"><Badge variant={statusToVariant(item.status)}>{item.status}</Badge></td>
                  <td className="px-4 py-3 font-mono text-xs text-text">{item.ready}</td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-xs ${item.restartCount > 20 ? "text-accent-crit" : item.restartCount > 5 ? "text-accent-warn" : item.restartCount > 0 ? "text-accent-warn/70" : "text-text-muted"}`}>
                      {item.restartCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.nodeName}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.age}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setLogTarget({ name: item.name, namespace: item.namespace, containers: item.containers })}
                        title={t("logs.viewLogs")}
                        className="h-6 w-6 flex items-center justify-center text-text-dim hover:text-accent transition-colors"
                      >
                        <ScrollText className="h-3.5 w-3.5" />
                      </button>
                      <button className="h-6 w-6 flex items-center justify-center text-text-dim hover:text-text transition-colors">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {logTarget && (
        <LogDrawer
          clusterId={clusterId}
          namespace={logTarget.namespace}
          podName={logTarget.name}
          containers={logTarget.containers}
          onClose={() => setLogTarget(null)}
        />
      )}
    </>
  );
}
