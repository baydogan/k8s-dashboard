"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface TableToolbarProps {
  search: string;
  onSearch: (v: string) => void;
  namespace?: string;
  onNamespace?: (v: string) => void;
  namespaces?: string[];
  totalCount: number;
  filteredCount: number;
}

export function TableToolbar({
  search,
  onSearch,
  namespace,
  onNamespace,
  namespaces,
  totalCount,
  filteredCount,
}: TableToolbarProps) {
  const t = useTranslations("common");
  const isFiltered = filteredCount < totalCount;

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-dim pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full pl-8 pr-7 py-1.5 text-xs font-mono bg-bg-sunken border border-border rounded-md text-text placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-dim hover:text-text transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      {namespaces && namespaces.length > 0 && onNamespace && (
        <select
          value={namespace}
          onChange={(e) => onNamespace(e.target.value)}
          className="text-xs font-mono bg-bg-sunken border border-border rounded-md text-text-muted px-2.5 py-1.5 focus:outline-none focus:border-accent/50 transition-colors"
        >
          <option value="">{t("allNamespaces")}</option>
          {namespaces.map((ns) => (
            <option key={ns} value={ns}>{ns}</option>
          ))}
        </select>
      )}
      {isFiltered && (
        <span className="font-mono text-[10px] text-text-dim tabular-nums">
          {filteredCount} / {totalCount}
        </span>
      )}
    </div>
  );
}
