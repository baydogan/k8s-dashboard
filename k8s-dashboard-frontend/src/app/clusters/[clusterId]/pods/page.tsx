import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { MoreHorizontal } from "lucide-react";
import { getPods } from "@/services/pod-service";
import { getTranslations } from "next-intl/server";
import type { PodStatus } from "@/entities/pod";

interface PodsPageProps {
  params: Promise<{ clusterId: string }>;
}

function statusToVariant(status: PodStatus) {
  switch (status) {
    case "Running":
    case "Succeeded":
      return "success" as const;
    case "Pending":
      return "info" as const;
    case "Failed":
    case "CrashLoopBackOff":
      return "critical" as const;
    default:
      return "muted" as const;
  }
}

function statusToDot(status: PodStatus): "healthy" | "warning" | "critical" | "pending" | "unknown" {
  switch (status) {
    case "Running":
    case "Succeeded":
      return "healthy";
    case "Pending":
      return "pending";
    case "Failed":
    case "CrashLoopBackOff":
      return "critical";
    default:
      return "unknown";
  }
}

export default async function PodsPage({ params }: PodsPageProps) {
  const { clusterId } = await params;
  const pods = await getPods(clusterId);
  const t = await getTranslations("pods");

  const runningCount = pods.filter((p) => p.status === "Running").length;
  const failingCount = pods.filter((p) => p.status === "CrashLoopBackOff" || p.status === "Failed").length;

  const columns = [
    t("columns.name"),
    t("columns.namespace"),
    t("columns.status"),
    t("columns.ready"),
    t("columns.restarts"),
    t("columns.node"),
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
            <div className="font-display text-2xl text-text">{pods.length}</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.running")}
            </div>
            <div className="font-display text-2xl text-accent">{runningCount}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.failing")}
            </div>
            <div className="font-display text-2xl text-accent-crit">{failingCount}</div>
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
                {pods.map((pod, i) => (
                  <tr
                    key={pod.name}
                    className="hover:bg-bg-sunken/50 transition-colors group cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <StatusDot status={statusToDot(pod.status)} pulse={pod.status === "Running"} />
                        <span className="font-mono text-xs text-text">{pod.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-text-muted">{pod.namespace}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusToVariant(pod.status)}>{pod.status}</Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text">{pod.ready}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-mono text-xs ${
                          pod.restartCount > 5
                            ? "text-accent-crit"
                            : pod.restartCount > 0
                            ? "text-accent-warn"
                            : "text-text-muted"
                        }`}
                      >
                        {pod.restartCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">{pod.nodeName}</td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">{pod.age}</td>
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
