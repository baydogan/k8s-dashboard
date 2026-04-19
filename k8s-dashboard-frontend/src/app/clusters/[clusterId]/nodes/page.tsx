import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { getNodes } from "@/services/node-service";
import { getTranslations } from "next-intl/server";

interface NodesPageProps {
  params: Promise<{ clusterId: string }>;
}

function usageColor(value: number): string {
  if (value >= 80) return "bg-accent-crit";
  if (value >= 60) return "bg-accent-warn";
  return "bg-accent";
}

export default async function NodesPage({ params }: NodesPageProps) {
  const { clusterId } = await params;
  const nodes = await getNodes(clusterId);
  const t = await getTranslations("nodes");

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {nodes.map((node, i) => (
            <Card
              key={node.name}
              className="p-5 animate-slide-up hover:border-accent/40 transition-all"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <StatusDot status={node.status === "Ready" ? "healthy" : "critical"} />
                    <Badge variant={node.status === "Ready" ? "success" : "critical"}>
                      {node.status}
                    </Badge>
                  </div>
                  <h3 className="font-display text-base font-medium text-text truncate">
                    {node.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-text-dim">
                    {node.roles.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                    <span>·</span>
                    <span>{node.version}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase">
                      {t("metrics.cpu")}
                    </span>
                    <span className="font-mono text-xs text-text">{node.cpuUsage}%</span>
                  </div>
                  <div className="h-1 bg-bg-sunken rounded-full overflow-hidden">
                    <div className={`h-full transition-all ${usageColor(node.cpuUsage)}`} style={{ width: `${node.cpuUsage}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase">
                      {t("metrics.memory")}
                    </span>
                    <span className="font-mono text-xs text-text">{node.memoryUsage}%</span>
                  </div>
                  <div className="h-1 bg-bg-sunken rounded-full overflow-hidden">
                    <div className={`h-full transition-all ${usageColor(node.memoryUsage)}`} style={{ width: `${node.memoryUsage}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border grid grid-cols-3 gap-2 text-[10px] font-mono">
                <div>
                  <div className="text-text-dim">{t("metrics.pods")}</div>
                  <div className="text-text mt-0.5">{node.podCount}</div>
                </div>
                <div>
                  <div className="text-text-dim">{t("metrics.age")}</div>
                  <div className="text-text mt-0.5">{node.age}</div>
                </div>
                <div>
                  <div className="text-text-dim">{t("metrics.ip")}</div>
                  <div className="text-text mt-0.5 truncate">{node.internalIP}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
