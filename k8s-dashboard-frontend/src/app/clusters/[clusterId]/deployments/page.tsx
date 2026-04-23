import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { MoreHorizontal } from "lucide-react";
import { getDeployments } from "@/services/deployment-service";
import { getTranslations } from "next-intl/server";
import type { DeploymentStatus } from "@/entities/deployment";

interface DeploymentsPageProps {
  params: Promise<{ clusterId: string }>;
}

function statusToVariant(status: DeploymentStatus) {
  switch (status) {
    case "Available":
      return "success" as const;
    case "Progressing":
      return "info" as const;
    case "Failed":
      return "critical" as const;
    case "Paused":
      return "warning" as const;
    case "ScaledDown":
      return "muted" as const;
  }
}

function statusToDot(
  status: DeploymentStatus
): "healthy" | "warning" | "critical" | "pending" | "unknown" {
  switch (status) {
    case "Available":
      return "healthy";
    case "Progressing":
      return "pending";
    case "Failed":
      return "critical";
    case "Paused":
      return "warning";
    case "ScaledDown":
      return "unknown";
  }
}

function statusKey(status: DeploymentStatus) {
  switch (status) {
    case "Available":
      return "available";
    case "Progressing":
      return "progressing";
    case "Failed":
      return "failed";
    case "Paused":
      return "paused";
    case "ScaledDown":
      return "scaledDown";
  }
}

export default async function DeploymentsPage({ params }: DeploymentsPageProps) {
  const { clusterId } = await params;
  const deployments = await getDeployments(clusterId);
  const t = await getTranslations("deployments");

  const availableCount = deployments.filter((d) => d.status === "Available").length;
  const progressingCount = deployments.filter((d) => d.status === "Progressing").length;
  const failedCount = deployments.filter((d) => d.status === "Failed").length;

  const columns = [
    t("columns.name"),
    t("columns.namespace"),
    t("columns.status"),
    t("columns.ready"),
    t("columns.upToDate"),
    t("columns.available"),
    t("columns.images"),
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
            <div className="font-display text-2xl text-text">{deployments.length}</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.available")}
            </div>
            <div className="font-display text-2xl text-accent">{availableCount}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.progressing")}
            </div>
            <div className="font-display text-2xl text-accent-info">{progressingCount}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.failed")}
            </div>
            <div className="font-display text-2xl text-accent-crit">{failedCount}</div>
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
                {deployments.map((dep, i) => (
                  <tr
                    key={dep.name}
                    className="hover:bg-bg-sunken/50 transition-colors group cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <StatusDot
                          status={statusToDot(dep.status)}
                          pulse={dep.status === "Progressing"}
                        />
                        <span className="font-mono text-xs text-text">{dep.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-text-muted">{dep.namespace}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusToVariant(dep.status)}>
                        {t(`status.${statusKey(dep.status)}`)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-mono text-xs ${
                          dep.readyReplicas < dep.desiredReplicas
                            ? dep.readyReplicas === 0
                              ? "text-accent-crit"
                              : "text-accent-warn"
                            : "text-text"
                        }`}
                      >
                        {dep.readyReplicas}/{dep.desiredReplicas}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">
                      {dep.upToDateReplicas}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">
                      {dep.availableReplicas}
                    </td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <div className="flex flex-col gap-0.5">
                        {dep.images.map((img) => (
                          <span
                            key={img}
                            className="font-mono text-[11px] text-text-dim truncate"
                            title={img}
                          >
                            {img}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">{dep.age}</td>
                    <td className="px-4 py-3">
                      <button className="h-6 w-6 flex items-center justify-center text-text-dim hover:text-text opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </PageContainer>
    </>
  );
}
