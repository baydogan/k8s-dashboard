"use client";

import { useState, useMemo } from "react";
import { TableToolbar } from "@/shared/components/ui/table-toolbar";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import type { KubernetesService, ServiceType } from "@/entities/kubernetes-service";

function typeToVariant(t: ServiceType) {
  switch (t) {
    case "LoadBalancer": return "success"  as const;
    case "NodePort":     return "info"     as const;
    case "ClusterIP":    return "muted"    as const;
    case "ExternalName": return "warning"  as const;
  }
}

function typeKey(t: ServiceType) {
  const map: Record<ServiceType, string> = { ClusterIP: "clusterIP", NodePort: "nodePort", LoadBalancer: "loadBalancer", ExternalName: "externalName" };
  return map[t];
}

export function ServicesTable({ items }: { items: KubernetesService[] }) {
  const [search, setSearch] = useState("");
  const [ns, setNs] = useState("");
  const t = useTranslations("services");
  const tc = useTranslations("common");

  const namespaces = useMemo(() => [...new Set(items.map((i) => i.namespace))].sort(), [items]);

  const filtered = useMemo(() =>
    items.filter((item) => {
      const q = search.toLowerCase();
      const match = !q || item.name.toLowerCase().includes(q) || item.namespace.toLowerCase().includes(q) || item.clusterIP.toLowerCase().includes(q);
      return match && (!ns || item.namespace === ns);
    }),
  [items, search, ns]);

  const headers = [t("columns.name"), t("columns.namespace"), t("columns.type"), t("columns.clusterIP"), t("columns.externalIP"), t("columns.ports"), t("columns.age"), ""];

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
                  <td className="px-4 py-3 font-mono text-xs text-text">{item.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.namespace}</td>
                  <td className="px-4 py-3"><Badge variant={typeToVariant(item.type)}>{t(`type.${typeKey(item.type)}`)}</Badge></td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.clusterIP}</td>
                  <td className="px-4 py-3">
                    {item.externalIP ? <span className="font-mono text-xs text-accent">{item.externalIP}</span> : <span className="font-mono text-xs text-text-dim">{t("noExternalIP")}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.ports.map((p) => <span key={p} className="font-mono text-[10px] bg-bg-sunken border border-border rounded px-1.5 py-0.5 text-text-dim">{p}</span>)}
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
