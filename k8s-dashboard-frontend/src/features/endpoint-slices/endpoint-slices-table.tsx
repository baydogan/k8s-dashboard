"use client";

import { useState, useMemo } from "react";
import { TableToolbar } from "@/shared/components/ui/table-toolbar";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import type { EndpointSlice, EndpointSliceAddressType } from "@/entities/endpoint-slice";

function addressTypeVariant(t: EndpointSliceAddressType) {
  switch (t) {
    case "IPv4": return "info"    as const;
    case "IPv6": return "warning" as const;
    case "FQDN": return "muted"   as const;
  }
}

export function EndpointSlicesTable({ items }: { items: EndpointSlice[] }) {
  const [search, setSearch] = useState("");
  const [ns, setNs] = useState("");
  const t = useTranslations("endpointSlices");
  const tc = useTranslations("common");

  const namespaces = useMemo(() => [...new Set(items.map((i) => i.namespace))].sort(), [items]);

  const filtered = useMemo(() =>
    items.filter((item) => {
      const q = search.toLowerCase();
      const match = !q ||
        item.name.toLowerCase().includes(q) ||
        item.namespace.toLowerCase().includes(q) ||
        item.service.toLowerCase().includes(q) ||
        item.ports.some((p) => String(p.port).includes(q));
      return match && (!ns || item.namespace === ns);
    }),
  [items, search, ns]);

  const headers = [t("columns.name"), t("columns.namespace"), t("columns.service"), t("columns.addressType"), t("columns.ready"), t("columns.ports"), t("columns.age"), ""];

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
                  <td className="px-4 py-3 font-mono text-xs text-text-dim">{item.service}</td>
                  <td className="px-4 py-3"><Badge variant={addressTypeVariant(item.addressType)}>{item.addressType}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 rounded-full bg-bg-sunken overflow-hidden">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${item.totalEndpoints > 0 ? (item.readyEndpoints / item.totalEndpoints) * 100 : 0}%` }} />
                      </div>
                      <span className={`font-mono text-xs ${item.readyEndpoints < item.totalEndpoints ? item.readyEndpoints === 0 ? "text-accent-crit" : "text-accent-warn" : "text-text"}`}>
                        {item.readyEndpoints}/{item.totalEndpoints}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      {item.ports.map((p, pi) => (
                        <span key={pi} className="font-mono text-[10px] bg-bg-sunken border border-border text-text-muted rounded px-1.5 py-0.5">
                          {p.name ? `${p.name}:` : ""}{p.port}/{p.protocol}
                        </span>
                      ))}
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
