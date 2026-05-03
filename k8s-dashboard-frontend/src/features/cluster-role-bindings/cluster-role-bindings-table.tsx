"use client";

import { useState, useMemo } from "react";
import { TableToolbar } from "@/shared/components/ui/table-toolbar";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { Link2, MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ClusterRoleBinding } from "@/entities/cluster-role-binding";

export function ClusterRoleBindingsTable({ items }: { items: ClusterRoleBinding[] }) {
  const [search, setSearch] = useState("");
  const t = useTranslations("clusterRoleBindings");
  const tc = useTranslations("common");

  const filtered = useMemo(() =>
    items.filter((item) => {
      const q = search.toLowerCase();
      return !q || item.name.toLowerCase().includes(q) || item.roleRef.toLowerCase().includes(q);
    }),
  [items, search]);

  const headers = [t("columns.name"), t("columns.roleRef"), t("columns.type"), t("columns.subjects"), t("columns.age"), ""];

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
                <tr><td colSpan={6} className="px-4 py-12 text-center font-mono text-xs text-text-dim">{search ? tc("noResults", { query: search }) : tc("noItems")}</td></tr>
              ) : filtered.map((item, i) => (
                <tr key={item.name} className="hover:bg-bg-sunken/50 transition-colors group cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link2 className="h-3.5 w-3.5 text-text-dim shrink-0" />
                      <span className="font-mono text-xs text-text">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-dim">{item.roleRef}</td>
                  <td className="px-4 py-3">
                    <Badge variant={item.builtin ? "muted" : "info"}>{item.builtin ? t("type.builtin") : t("type.custom")}</Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.subjects}</td>
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
