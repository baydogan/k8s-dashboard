"use client";

import { Bell, ChevronDown, Moon, Search, Sun, User } from "lucide-react";
import { useDashboardStore } from "@/shared/store/dashboard-store";
import { LocaleToggle } from "@/shared/components/ui/locale-toggle";
import { useTranslations } from "next-intl";

interface HeaderProps {
  title: string;
  breadcrumbs?: string[];
}

export function Header({ title, breadcrumbs = [] }: HeaderProps) {
  const { selectedNamespace, setSelectedNamespace, theme, toggleTheme } = useDashboardStore();
  const t = useTranslations("header");

  return (
    <header className="h-12 shrink-0 border-b border-border bg-bg-raised flex items-center justify-between px-5 gap-4">
      {/* Breadcrumb + title */}
      <div className="flex items-center gap-1.5 min-w-0 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5 text-text-dim shrink-0">
            <span>{crumb}</span>
            <span>/</span>
          </span>
        ))}
        <span className="font-semibold text-text truncate">{title}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Namespace filter */}
        <div className="flex items-center gap-1.5 h-7 px-2.5 border border-border rounded-md bg-bg-sunken hover:border-border-strong transition-colors">
          <span className="text-[10px] font-semibold text-text-dim">{t("namespaceLabel")}</span>
          <select
            value={selectedNamespace}
            onChange={(e) => setSelectedNamespace(e.target.value)}
            className="bg-transparent text-xs text-text border-none outline-none cursor-pointer"
          >
            <option value="all">{t("namespaceAll")}</option>
            <option value="default">default</option>
            <option value="kube-system">kube-system</option>
            <option value="production">production</option>
            <option value="staging">staging</option>
          </select>
        </div>

        <LocaleToggle />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? t("switchToLight") : t("switchToDark")}
          className="h-7 w-7 flex items-center justify-center border border-border rounded-md hover:border-border-strong text-text-muted hover:text-text transition-colors"
        >
          {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </button>

        {/* Search */}
        <button className="h-7 w-7 flex items-center justify-center border border-border rounded-md hover:border-border-strong text-text-muted hover:text-text transition-colors">
          <Search className="h-3.5 w-3.5" />
        </button>

        {/* Notifications */}
        <button className="relative h-7 w-7 flex items-center justify-center border border-border rounded-md hover:border-border-strong text-text-muted hover:text-text transition-colors">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-accent-crit rounded-full" />
        </button>

        {/* User */}
        <button className="flex items-center gap-1.5 h-7 pl-1 pr-2 border border-border rounded-md hover:border-border-strong transition-colors">
          <div className="h-5 w-5 bg-accent/15 rounded flex items-center justify-center">
            <User className="h-3 w-3 text-accent" />
          </div>
          <span className="text-xs font-medium text-text">ops@k8s</span>
          <ChevronDown className="h-3 w-3 text-text-dim" />
        </button>
      </div>
    </header>
  );
}
