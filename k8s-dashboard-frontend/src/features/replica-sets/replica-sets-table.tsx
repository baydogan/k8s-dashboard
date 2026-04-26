"use client";

import { useState, useMemo } from "react";
import { TableToolbar } from "@/shared/components/ui/table-toolbar";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReplicaSet, ReplicaSetStatus } from "@/entities/replica-set";

function statusToVariant(s: ReplicaSetStatus) {
  switch (s) {
    case "Available":   return "success"  as const;
    case "Degraded":    return "warning"  as const;
    case "Unavailable": return "critical" as const;
    case "Idle":        return "muted"    as const;
  }
}

function statusToDot(s: ReplicaSetStatus): "healthy" | "warning" | "critical" | "unknown" {
  switch (s) {
    case "Available":   return "healthy";
    case "Degraded":    return "warning";
    case "Unavailable": return "critical";
    case "Idle":        return "unknown";
  }
}

function statusKey(s: ReplicaSetStatus) {
  const map: Record<ReplicaSetStatus, string> = { Available: "available", Degraded: "degraded", Unavailable: "unavailable", Idle: "idle" };
  return map[s];
}

export function ReplicaSetsTable({ items }: { items: ReplicaSet[] }) {
  const [search, setSearch] = useState("");
  const [ns, setNs] = useState("");
  const t = useTranslations("replicaSets");
  const tc = useTranslations("common");

  const namespaces = useMemo(() => [...new Set(items.map((i) => i.namespace))].sort(), [items]);

  const filtered = useMemo(() =>
    items.filter((item) => {
      const q = search.toLowerCase();
      const match = !q ||
        item.name.toLowerCase().includes(q) ||
        item.namespace.toLowerCase().includes(q) ||
        (item.ownerDeployment ?? "").toLowerCase().includes(q);
      return match && (!ns || item.namespace === ns);
    }),
  [items, search, ns]);

  const headers = [t("columns.name"), t("columns.namespace"), t("columns.status"), t("columns.ready"), t("columns.owner"), t("columns.images"), t("columns.age"), ""];

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
                      <StatusDot status={statusToDot(item.status)} />
                      <span className="font-mono text-xs text-text">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.namespace}</td>
                  <td className="px-4 py-3"><Badge variant={statusToVariant(item.status)}>{t(`status.${statusKey(item.status)}`)}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 rounded-full bg-bg-sunken overflow-hidden">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${item.desiredReplicas > 0 ? (item.readyReplicas / item.desiredReplicas) * 100 : 0}%` }} />
                      </div>
                      <span className={`font-mono text-xs ${item.readyReplicas < item.desiredReplicas ? item.readyReplicas === 0 ? "text-accent-crit" : "text-accent-warn" : "text-text"}`}>
                        {item.readyReplicas}/{item.desiredReplicas}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-dim">{item.ownerDeployment ?? <span className="text-text-dim/40">—</span>}</td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <div className="flex flex-col gap-0.5">
                      {item.images.map((img) => <span key={img} className="font-mono text-[11px] text-text-dim truncate" title={img}>{img}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.age}</td>
                  <td className="px-4 py-3"><button className="h-6 w-6 flex items-center justify-center text-text-dim hover:text-text opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-3.5 w-3.5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
