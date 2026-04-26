"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Box,
  Boxes,
  Copy,
  Plug,
  Plug2,
  Briefcase,
  ChevronRight,
  Cpu,
  Database,
  FileStack,
  Gauge,
  Globe,
  HardDrive,
  KeyRound,
  Layers,
  LayoutGrid,
  Lock,
  LucideIcon,
  Network,
  Package,
  Scale,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  StickyNote,
  Timer,
  UserCircle,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Logo } from "@/shared/components/ui/logo";
import { useTranslations } from "next-intl";
import { useAiStore } from "@/shared/store/ai-store";

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
  const t = useTranslations("nav");
  const openPanel = useAiStore((s) => s.openPanel);

  const groups: NavGroup[] = [
    {
      label: t("groups.overview"),
      items: [
        { label: t("items.dashboard"), href: `${base}/overview`, icon: LayoutGrid },
        { label: t("items.events"), href: `${base}/events`, icon: Activity, badge: t("live") },
      ],
    },
    {
      label: t("groups.workloads"),
      items: [
        { label: t("items.pods"),        href: `${base}/pods`,        icon: Box       },
        { label: t("items.deployments"), href: `${base}/deployments`, icon: Boxes     },
        { label: t("items.replicaSets"),  href: `${base}/replica-sets`,icon: Copy      },
        { label: t("items.statefulSets"),href: `${base}/statefulsets`,icon: Database  },
        { label: t("items.daemonSets"),  href: `${base}/daemonsets`,  icon: HardDrive },
        { label: t("items.jobs"),        href: `${base}/jobs`,        icon: Briefcase },
        { label: t("items.cronJobs"),    href: `${base}/cronjobs`,    icon: Timer     },
        { label: t("items.hpa"),         href: `${base}/hpa`,         icon: Gauge     },
      ],
    },
    {
      label: t("groups.cluster"),
      items: [
        { label: t("items.nodes"),          href: `${base}/nodes`,           icon: Cpu        },
        { label: t("items.namespaces"),     href: `${base}/namespaces`,      icon: Layers     },
        { label: t("items.apiServer"),      href: `${base}/api-server`,      icon: ShieldCheck },
        { label: t("items.pdb"),            href: `${base}/pdb`,             icon: ShieldAlert },
        { label: t("items.resourceQuotas"), href: `${base}/resource-quotas`, icon: Scale      },
      ],
    },
    {
      label: t("groups.network"),
      items: [
        { label: t("items.services"),        href: `${base}/services`,         icon: Network },
        { label: t("items.ingresses"),       href: `${base}/ingresses`,        icon: Globe   },
        { label: t("items.endpoints"),       href: `${base}/endpoints`,        icon: Plug    },
        { label: t("items.endpointSlices"),  href: `${base}/endpoint-slices`,  icon: Plug2   },
      ],
    },
    {
      label: t("groups.storage"),
      items: [
        { label: t("items.persistentVolumes"),      href: `${base}/persistent-volumes`,       icon: Server    },
        { label: t("items.persistentVolumeClaims"), href: `${base}/persistent-volume-claims`, icon: FileStack },
        { label: t("items.storageClasses"),         href: `${base}/storage-classes`,          icon: Package   },
      ],
    },
    {
      label: t("groups.config"),
      items: [
        { label: t("items.configMaps"),  href: `${base}/configmaps`, icon: StickyNote  },
        { label: t("items.secrets"),     href: `${base}/secrets`,    icon: Lock        },
        { label: t("items.limitRanges"), href: `${base}/limit-ranges`, icon: Scale     },
      ],
    },
    {
      label: t("groups.rbac"),
      items: [
        { label: t("items.serviceAccounts"),  href: `${base}/service-accounts`,  icon: UserCircle  },
        { label: t("items.roles"),            href: `${base}/roles`,             icon: KeyRound    },
        { label: t("items.networkPolicies"),  href: `${base}/network-policies`,  icon: ShieldAlert },
      ],
    },
  ];

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-bg-raised flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="h-13 px-4 flex items-center border-b border-border">
        <Logo />
      </div>

      {/* Cluster switcher */}
      <Link
        href="/clusters"
        className={cn(
          "mx-3 mt-3 mb-1 px-3 py-2 border border-border rounded-md",
          "flex items-center justify-between gap-2 group",
          "hover:border-border-strong hover:bg-bg-sunken transition-all duration-150"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-1.5 w-1.5 bg-accent rounded-full shrink-0 animate-pulse-dot" />
          <div className="min-w-0">
            <p className="text-[10px] text-text-dim mb-0.5">{t("activeCluster")}</p>
            <p className="text-xs font-medium text-text truncate">production-eu-west-1</p>
          </div>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-text-dim shrink-0" />
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {groups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-4 mb-1 text-[10px] font-semibold tracking-wider text-text-dim uppercase">
              {group.label}
            </p>
            <ul className="px-2 space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md",
                        "text-sm transition-all duration-150 relative",
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-text-muted hover:text-text hover:bg-bg-sunken"
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 inset-y-1.5 w-0.5 bg-accent rounded-r-full" />
                      )}
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold text-accent-crit tracking-wider animate-pulse-dot">
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
      </nav>

      {/* AI section */}
      <div className="px-3 pb-3 border-t border-border pt-3">
        <button
          onClick={openPanel}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md border border-border",
            "hover:border-accent/30 hover:bg-accent/5 transition-all duration-150 group"
          )}
        >
          <div className="h-6 w-6 rounded bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
          </div>
          <div className="text-left min-w-0">
            <p className="text-xs font-medium text-text">{t("ai.title")}</p>
            <p className="text-[10px] text-text-dim truncate">{t("ai.description")}</p>
          </div>
        </button>

        <div className="mt-3 flex items-center justify-between px-1 text-[10px] text-text-dim">
          <span>{t("footer.apiVersion", { version: "1.28.3" })}</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-accent rounded-full" />
            {t("footer.connected")}
          </span>
        </div>
      </div>
    </aside>
  );
}
