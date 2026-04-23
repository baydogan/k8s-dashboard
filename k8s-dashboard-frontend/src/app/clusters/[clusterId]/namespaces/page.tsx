import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { MoreHorizontal } from "lucide-react";
import { getNamespaces } from "@/services/namespace-service";
import { getTranslations } from "next-intl/server";
import type { NamespaceStatus } from "@/entities/namespace";

interface NamespacesPageProps {
  params: Promise<{ clusterId: string }>;
}

function statusToVariant(status: NamespaceStatus) {
  switch (status) {
    case "Active":
      return "success" as const;
    case "Terminating":
      return "warning" as const;
  }
}

function statusToDot(status: NamespaceStatus): "healthy" | "warning" {
  switch (status) {
    case "Active":
      return "healthy";
    case "Terminating":
      return "warning";
  }
}

export default async function NamespacesPage({ params }: NamespacesPageProps) {
  const { clusterId } = await params;
  const namespaces = await getNamespaces(clusterId);
  const t = await getTranslations("namespaces");

  const activeCount = namespaces.filter((n) => n.status === "Active").length;
  const terminatingCount = namespaces.filter((n) => n.status === "Terminating").length;

  const columns = [
    t("columns.name"),
    t("columns.status"),
    t("columns.pods"),
    t("columns.deployments"),
    t("columns.services"),
    t("columns.labels"),
    t("columns.age"),
    "",
  ];

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.total")}
            </div>
            <div className="font-display text-2xl text-text">{namespaces.length}</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.active")}
            </div>
            <div className="font-display text-2xl text-accent">{activeCount}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.terminating")}
            </div>
            <div className="font-display text-2xl text-accent-warn">{terminatingCount}</div>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  {columns.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-[10px] font-mono tracking-[0.15em] text-text-dim uppercase font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {namespaces.map((ns, i) => {
                  const labelEntries = Object.entries(ns.labels);
                  return (
                    <tr
                      key={ns.name}
                      className="hover:bg-bg-sunken/50 transition-colors group cursor-pointer animate-slide-up"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <StatusDot
                            status={statusToDot(ns.status)}
                            pulse={ns.status === "Terminating"}
                          />
                          <span className="font-mono text-xs text-text">{ns.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusToVariant(ns.status)}>
                          {t(`status.${ns.status === "Active" ? "active" : "terminating"}`)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-text-muted">
                        {ns.podCount}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-text-muted">
                        {ns.deploymentCount}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-text-muted">
                        {ns.serviceCount}
                      </td>
                      <td className="px-4 py-3 max-w-[220px]">
                        {labelEntries.length === 0 ? (
                          <span className="font-mono text-xs text-text-dim">{t("noLabels")}</span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {labelEntries.slice(0, 3).map(([k, v]) => (
                              <span
                                key={k}
                                className="inline-flex items-center gap-0.5 font-mono text-[10px] bg-bg-sunken border border-border rounded px-1.5 py-0.5 text-text-dim"
                                title={`${k}=${v}`}
                              >
                                <span className="text-text-muted">{k}</span>
                                <span className="text-text-dim/50">=</span>
                                <span className="text-accent/80">{v}</span>
                              </span>
                            ))}
                            {labelEntries.length > 3 && (
                              <span className="font-mono text-[10px] text-text-dim px-1">
                                +{labelEntries.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-text-muted">{ns.age}</td>
                      <td className="px-4 py-3">
                        <button className="h-6 w-6 flex items-center justify-center text-text-dim hover:text-text opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </PageContainer>
    </>
  );
}
