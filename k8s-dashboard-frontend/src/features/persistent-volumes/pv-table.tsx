"use client";

import { useState, useMemo } from "react";
import { TableToolbar } from "@/shared/components/ui/table-toolbar";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PersistentVolume, PVStatus } from "@/entities/persistent-volume";

function statusToVariant(s: PVStatus) {
  switch (s) {
    case "Bound":     return "success"  as const;
    case "Available": return "info"     as const;
    case "Released":  return "warning"  as const;
    case "Failed":    return "critical" as const;
  }
}

function statusToDot(s: PVStatus): "healthy" | "pending" | "warning" | "critical" {
  switch (s) {
    case "Bound":     return "healthy";
    case "Available": return "pending";
    case "Released":  return "warning";
    case "Failed":    return "critical";
  }
}

export function PVTable({ items }: { items: PersistentVolume[] }) {
  const [search, setSearch] = useState("");
  const t = useTranslations("persistentVolumes");
  const tc = useTranslations("common");

  const filtered = useMemo(() =>
    items.filter((item) => {
      const q = search.toLowerCase();
      return !q || item.name.toLowerCase().includes(q) || item.storageClass.toLowerCase().includes(q) || (item.claim ?? "").toLowerCase().includes(q);
    }),
  [items, search]);

  const headers = [t("columns.name"), t("columns.status"), t("columns.capacity"), t("columns.accessModes"), t("columns.reclaimPolicy"), t("columns.storageClass"), t("columns.claim"), t("columns.age"), ""];

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
                <tr><td colSpan={9} className="px-4 py-12 text-center font-mono text-xs text-text-dim">{search ? tc("noResults", { query: search }) : tc("noItems")}</td></tr>
              ) : filtered.map((item, i) => (
                <tr key={item.name} className="hover:bg-bg-sunken/50 transition-colors group cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <StatusDot status={statusToDot(item.status)} />
                      <span className="font-mono text-xs text-text">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge variant={statusToVariant(item.status)}>{t(`status.${item.status.toLowerCase() as "bound" | "available" | "released" | "failed"}`)}</Badge></td>
                  <td className="px-4 py-3 font-mono text-xs text-text">{item.capacity}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-dim">{item.accessModes.join(", ")}</td>
                  <td className="px-4 py-3"><span className={`font-mono text-xs ${item.reclaimPolicy === "Retain" ? "text-accent" : "text-text-muted"}`}>{item.reclaimPolicy}</span></td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.storageClass}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-dim truncate max-w-[180px]" title={item.claim ?? ""}>{item.claim ?? t("noClaim")}</td>
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
