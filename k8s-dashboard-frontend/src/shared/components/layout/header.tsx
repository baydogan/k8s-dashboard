"use client";

import { Bell, ChevronDown, Moon, Search, Sun, User } from "lucide-react";
import { useDashboardStore } from "@/shared/store/dashboard-store";

interface HeaderProps {
  title: string;
  breadcrumbs?: string[];
}

export function Header({ title, breadcrumbs = [] }: HeaderProps) {
  const { selectedNamespace, setSelectedNamespace, theme, toggleTheme } = useDashboardStore();

  return (
    <header className="h-14 shrink-0 border-b border-border bg-bg-raised/30 backdrop-blur-sm flex items-center justify-between px-5 gap-4">
      {/* Title + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-text-dim">{crumb}</span>
              <span className="text-text-dim">/</span>
            </div>
          ))}
          <h1 className="font-display text-base font-medium text-text truncate">
            {title}
          </h1>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Namespace filter */}
        <div className="flex items-center gap-2 h-8 px-3 border border-border rounded-sm bg-bg-sunken hover:border-border-strong transition-colors cursor-pointer group">
          <span className="text-[9px] font-mono tracking-[0.15em] text-text-dim uppercase">
            NS
          </span>
          <select
            value={selectedNamespace}
            onChange={(e) => setSelectedNamespace(e.target.value)}
            className="bg-transparent text-xs font-mono text-text border-none outline-none cursor-pointer pr-4"
          >
            <option value="all">all namespaces</option>
            <option value="default">default</option>
            <option value="kube-system">kube-system</option>
            <option value="production">production</option>
            <option value="staging">staging</option>
          </select>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="h-8 w-8 flex items-center justify-center border border-border rounded-sm hover:border-border-strong text-text-muted hover:text-text transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="h-3.5 w-3.5" />
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Search */}
        <button className="h-8 w-8 flex items-center justify-center border border-border rounded-sm hover:border-border-strong text-text-muted hover:text-text transition-colors">
          <Search className="h-3.5 w-3.5" />
        </button>

        {/* Notifications */}
        <button className="h-8 w-8 flex items-center justify-center border border-border rounded-sm hover:border-border-strong text-text-muted hover:text-text transition-colors relative">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-accent-crit rounded-full" />
        </button>

        {/* User menu */}
        <button className="flex items-center gap-2 h-8 pl-1 pr-2 border border-border rounded-sm hover:border-border-strong transition-colors">
          <div className="h-6 w-6 bg-accent/20 border border-accent/40 rounded-sm flex items-center justify-center">
            <User className="h-3 w-3 text-accent" />
          </div>
          <span className="text-xs font-mono text-text">ops@k8s</span>
          <ChevronDown className="h-3 w-3 text-text-muted" />
        </button>
      </div>
    </header>
  );
}
