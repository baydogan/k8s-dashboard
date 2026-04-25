"use client";

import { useState, useMemo } from "react";
import { TableToolbar } from "@/shared/components/ui/table-toolbar";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Namespace, NamespaceStatus } from "@/entities/namespace";

function statusToVariant(s: NamespaceStatus) {
  return s === "Active" ? "success" as const : "warning" as const;
}

function statusToDot(s: NamespaceStatus): "healthy" | "warning" {
  return s === "Active" ? "healthy" : "warning";
}

export function NamespacesTable({ items }: { items: Namespace[] }) {
  const [search, setSearch] = useState("");
  const t = useTranslations("namespaces");
  const tc = useTranslations("common");

  const filtered = useMemo(() =>
    items.filter((item) => {
      const q = search.toLowerCase();
      return !q || item.name.toLowerCase().includes(q) || Object.keys(item.labels).some((k) => k.toLowerCase().includes(q));
    }),
  [items, search]);

  const headers = [t("columns.name"), t("columns.status"), t("columns.pods"), t("columns.deployments"), t("columns.services"), t("columns.labels"), t("columns.age"), ""];

  return (
    <>
      <TableToolbar search={search} onSearch={setSearch} totalCount={items.length} filteredCount={filtered.length} />
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
              ) : filtered.map((item, i) => {
                const labelEntries = Object.entries(item.labels);
                return (
                  <tr key={item.name} className="hover:bg-bg-sunken/50 transition-colors group cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <StatusDot status={statusToDot(item.status)} pulse={item.status === "Terminating"} />
                        <span className="font-mono text-xs text-text">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant={statusToVariant(item.status)}>{t(`status.${item.status === "Active" ? "active" : "terminating"}`)}</Badge></td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.podCount}</td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.deploymentCount}</td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.serviceCount}</td>
                    <td className="px-4 py-3 max-w-[220px]">
                      {labelEntries.length === 0 ? (
                        <span className="font-mono text-xs text-text-dim">{t("noLabels")}</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {labelEntries.slice(0, 3).map(([k, v]) => (
                            <span key={k} className="inline-flex items-center gap-0.5 font-mono text-[10px] bg-bg-sunken border border-border rounded px-1.5 py-0.5 text-text-dim" title={`${k}=${v}`}>
                              <span className="text-text-muted">{k}</span>
                              <span className="text-text-dim/50">=</span>
                              <span className="text-accent/80">{v}</span>
                            </span>
                          ))}
                          {labelEntries.length > 3 && <span className="font-mono text-[10px] text-text-dim px-1">+{labelEntries.length - 3}</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.age}</td>
                    <td className="px-4 py-3"><button className="h-6 w-6 flex items-center justify-center text-text-dim hover:text-text opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-3.5 w-3.5" /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
