import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { Badge } from "@/shared/components/ui/badge";
import { Activity, Box, Cpu, Layers, TrendingUp } from "lucide-react";
import { getOverview } from "@/services/overview-service";
import { getTranslations } from "next-intl/server";

interface OverviewPageProps {
  params: Promise<{ clusterId: string }>;
}

const STAT_ICONS = [Cpu, Box, Layers, Activity];

export default async function OverviewPage({ params }: OverviewPageProps) {
  const { clusterId } = await params;
  const { stats, recentEvents, resourceMetrics, workloads } = await getOverview(clusterId);
  const t = await getTranslations("overview");

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb"), clusterId]} />
      <PageContainer>
        {/* Intro section */}
        <section className="mb-6">
          <div className="flex items-center gap-2 text-[10px] font-mono text-text-dim tracking-[0.2em] mb-2">
            <span className="w-4 h-px bg-accent" />
            {t("stateLabel")}
          </div>
          <h2 className="font-display text-2xl font-semibold text-text mb-1">
            {t("allOperational")}
          </h2>
          <p className="text-sm text-text-muted">
            {t("lastSynced", { time: new Date().toLocaleTimeString() })}
          </p>
        </section>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <Card
                key={stat.label}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="p-5 relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-2xl" />
                  <div className="flex items-start justify-between mb-4 relative">
                    <Icon className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
                    <span className="text-[10px] font-mono text-accent">
                      {stat.trend !== "0" && <TrendingUp className="inline h-2.5 w-2.5 mr-0.5" />}
                      {stat.trend}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="font-display text-3xl font-semibold text-text mb-1">
                      {stat.value}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-[0.15em] text-text-dim uppercase">
                        {stat.label}
                      </span>
                      <span className="text-[10px] font-mono text-text-muted">
                        {stat.sub}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Two column: events + resources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent events */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t("recentEvents.title")}</CardTitle>
              <Badge variant="info">
                <span className="h-1.5 w-1.5 bg-accent-info rounded-full animate-pulse-dot" />
                {t("recentEvents.live")}
              </Badge>
            </CardHeader>
            <div className="divide-y divide-border">
              {recentEvents.map((event, i) => (
                <div
                  key={i}
                  className="px-4 py-3 flex items-start gap-3 hover:bg-bg-sunken/50 transition-colors"
                >
                  <StatusDot
                    status={
                      event.type === "normal"
                        ? "healthy"
                        : event.type === "warning"
                        ? "warning"
                        : "critical"
                    }
                    pulse={false}
                    className="mt-1.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-text">
                        {event.resource}
                      </span>
                      <span className="text-[9px] font-mono text-text-dim">
                        {event.time} ago
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">
                      {event.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Resource snapshot */}
          <Card>
            <CardHeader>
              <CardTitle>{t("resources.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resourceMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase">
                      {metric.label}
                    </span>
                    <span className="font-mono text-xs text-text">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-1 bg-bg-sunken rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${metric.color} transition-all`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase">
                    {t("resources.workloads")}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t("resources.running")}</span>
                    <span className="text-accent">{workloads.running}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t("resources.pending")}</span>
                    <span className="text-accent-warn">{workloads.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t("resources.failed")}</span>
                    <span className="text-accent-crit">{workloads.failed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t("resources.succeeded")}</span>
                    <span className="text-text">{workloads.succeeded}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}
