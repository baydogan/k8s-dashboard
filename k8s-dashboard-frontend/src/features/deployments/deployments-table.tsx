"use client";

import { useState, useMemo } from "react";
import { TableToolbar } from "@/shared/components/ui/table-toolbar";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Deployment, DeploymentStatus } from "@/entities/deployment";

function statusToVariant(s: DeploymentStatus) {
  switch (s) {
    case "Available":   return "success"  as const;
    case "Progressing": return "info"     as const;
    case "Failed":      return "critical" as const;
    case "Paused":      return "warning"  as const;
    case "ScaledDown":  return "muted"    as const;
  }
}

function statusToDot(s: DeploymentStatus): "healthy" | "warning" | "critical" | "pending" | "unknown" {
  switch (s) {
    case "Available":   return "healthy";
    case "Progressing": return "pending";
    case "Failed":      return "critical";
    case "Paused":      return "warning";
    case "ScaledDown":  return "unknown";
  }
}

function statusKey(s: DeploymentStatus) {
  const map: Record<DeploymentStatus, string> = { Available: "available", Progressing: "progressing", Failed: "failed", Paused: "paused", ScaledDown: "scaledDown" };
  return map[s];
}

export function DeploymentsTable({ items }: { items: Deployment[] }) {
  const [search, setSearch] = useState("");
  const [ns, setNs] = useState("");
  const t = useTranslations("deployments");
  const tc = useTranslations("common");

  const namespaces = useMemo(() => [...new Set(items.map((i) => i.namespace))].sort(), [items]);

  const filtered = useMemo(() =>
    items.filter((item) => {
      const q = search.toLowerCase();
      const match = !q || item.name.toLowerCase().includes(q) || item.namespace.toLowerCase().includes(q);
      return match && (!ns || item.namespace === ns);
    }),
  [items, search, ns]);

  const headers = [t("columns.name"), t("columns.namespace"), t("columns.status"), t("columns.ready"), t("columns.upToDate"), t("columns.available"), t("columns.images"), t("columns.age"), ""];

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
                <tr><td colSpan={9} className="px-4 py-12 text-center font-mono text-xs text-text-dim">{search ? tc("noResults", { query: search }) : tc("noItems")}</td></tr>
              ) : filtered.map((item, i) => (
                <tr key={`${item.namespace}/${item.name}`} className="hover:bg-bg-sunken/50 transition-colors group cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <StatusDot status={statusToDot(item.status)} pulse={item.status === "Progressing"} />
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
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.upToDateReplicas}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.availableReplicas}</td>
                  <td className="px-4 py-3 max-w-[200px]">
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
