"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Box,
  Boxes,
  ChevronsUpDown,
  Cpu,
  Globe,
  Layers,
  LayoutGrid,
  LucideIcon,
  Network,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Logo } from "@/shared/components/ui/logo";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export function Sidebar({ clusterId }: { clusterId: string }) {
  const pathname = usePathname();
  const base = `/clusters/${clusterId}`;

  const groups: NavGroup[] = [
    {
      label: "OVERVIEW",
      items: [
        { label: "Dashboard", href: `${base}/overview`, icon: LayoutGrid },
        { label: "Events", href: `${base}/events`, icon: Activity, badge: "LIVE" },
      ],
    },
    {
      label: "WORKLOADS",
      items: [
        { label: "Pods", href: `${base}/pods`, icon: Box },
        { label: "Deployments", href: `${base}/deployments`, icon: Boxes },
      ],
    },
    {
      label: "CLUSTER",
      items: [
        { label: "Nodes", href: `${base}/nodes`, icon: Cpu },
        { label: "Namespaces", href: `${base}/namespaces`, icon: Layers },
      ],
    },
    {
      label: "NETWORK",
      items: [
        { label: "Services", href: `${base}/services`, icon: Network },
        { label: "Ingresses", href: `${base}/ingresses`, icon: Globe },
      ],
    },
  ];

  return (
    <aside className="w-60 shrink-0 border-r border-border bg-bg-raised/50 flex flex-col">
      {/* Logo section */}
      <div className="h-14 px-4 border-b border-border flex items-center">
        <Logo />
      </div>

      {/* Cluster switcher */}
      <Link
        href="/clusters"
        className={cn(
          "mx-3 mt-3 mb-1 px-3 py-2.5 border border-border rounded-sm",
          "flex items-center justify-between gap-2 group",
          "hover:border-accent/40 hover:bg-accent/5 transition-all"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2 w-2 bg-accent rounded-full animate-pulse-dot shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-mono tracking-[0.2em] text-text-dim uppercase">
              Active Cluster
            </span>
            <span className="text-xs font-mono text-text truncate">
              production-eu-west-1
            </span>
          </div>
        </div>
        <ChevronsUpDown className="h-3.5 w-3.5 text-text-muted group-hover:text-accent transition-colors shrink-0" />
      </Link>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3">
        {groups.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="px-5 mb-1.5">
              <span className="text-[9px] font-mono tracking-[0.25em] text-text-dim">
                {group.label}
              </span>
            </div>
            <ul className="px-2 space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between gap-2 px-3 py-1.5 rounded-sm",
                        "font-mono text-xs transition-all duration-150 relative",
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-text-muted hover:text-text hover:bg-bg-raised"
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-accent" />
                      )}
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[8px] font-bold tracking-wider text-accent-crit animate-pulse-dot">
                          ● {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* AI section */}
        <div className="px-3 mt-6">
          <div className="p-3 border border-border rounded-sm bg-gradient-to-br from-accent/5 via-bg-raised to-bg-raised relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="text-[10px] font-mono tracking-[0.15em] text-text uppercase">
                  AI Assistant
                </span>
              </div>
              <p className="text-[10px] text-text-muted leading-relaxed mb-3">
                Query your cluster in natural language
              </p>
              <button className="w-full h-7 flex items-center justify-center gap-1.5 bg-accent/10 border border-accent/30 text-accent text-[10px] font-mono hover:bg-accent/20 transition-colors rounded-sm">
                <Zap className="h-3 w-3" />
                ASK ASSISTANT
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center justify-between text-[9px] font-mono text-text-dim">
          <span>API v1.28.3</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-accent rounded-full" />
            CONNECTED
          </span>
        </div>
      </div>
    </aside>
  );
}
