import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { getApiServerSlo } from "@/services/api-server-service";
import { getTranslations } from "next-intl/server";
import { Sparkline } from "@/features/api-server/sparkline";
import type { SloStatus } from "@/entities/api-server";

interface ApiServerPageProps {
  params: Promise<{ clusterId: string }>;
}

function sloVariant(status: SloStatus) {
  switch (status) {
    case "met":       return "success" as const;
    case "at_risk":   return "warning" as const;
    case "violated":  return "critical" as const;
  }
}

function availabilityColor(value: number, target: number) {
  if (value >= target)            return "text-accent";
  if (value >= target - 0.1)      return "text-accent-warn";
  return "text-accent-crit";
}

function availabilityBarColor(value: number, target: number) {
  if (value >= target)            return "bg-accent";
  if (value >= target - 0.1)      return "bg-accent-warn";
  return "bg-accent-crit";
}

function latencyColor(ms: number) {
  if (ms < 50)   return "bg-accent";
  if (ms < 150)  return "bg-accent-warn";
  return "bg-accent-crit";
}

function latencyTextColor(ms: number) {
  if (ms < 50)   return "text-accent";
  if (ms < 150)  return "text-accent-warn";
  return "text-accent-crit";
}

function errorRateColor(rate: number) {
  if (rate < 0.1)  return "text-accent";
  if (rate < 0.5)  return "text-accent-warn";
  return "text-accent-crit";
}

export default async function ApiServerPage({ params }: ApiServerPageProps) {
  const { clusterId } = await params;
  const data = await getApiServerSlo(clusterId);
  const t = await getTranslations("apiServer");

  const maxVerbRate = Math.max(...data.verbRates.map((v) => v.ratePerSec));
  const totalStatusRate = data.statusCodeRates.reduce((s, c) => s + c.ratePerSec, 0);

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>

        {/* ── SLO Availability ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

          {/* SLO Status */}
          <Card>
            <div className="p-5 flex flex-col justify-between h-full">
              <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-4">
                {t("sloStatus.label")}
              </div>
              <div className="flex-1 flex flex-col items-center justify-center py-4 gap-3">
                <Badge variant={sloVariant(data.sloStatus)} className="text-sm px-4 py-1 h-auto">
                  {t(`sloStatus.${data.sloStatus}`)}
                </Badge>
                <p className="text-[11px] font-mono text-text-dim">
                  {t("sloStatus.target")} &nbsp;
                  <span className="text-text">{data.sloTarget}%</span>
                </p>
              </div>
            </div>
          </Card>

          {/* Read Availability */}
          <Card>
            <div className="p-5">
              <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-3">
                {t("availability.read")}
              </div>
              <div className={`font-display text-4xl font-semibold mb-4 ${availabilityColor(data.readAvailability, data.sloTarget)}`}>
                {data.readAvailability.toFixed(2)}
                <span className="text-xl font-normal ml-1 text-text-muted">%</span>
              </div>
              <div className="h-1.5 bg-bg-sunken rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${availabilityBarColor(data.readAvailability, data.sloTarget)}`}
                  style={{ width: `${Math.min(data.readAvailability, 100)}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="font-mono text-[10px] text-text-dim">0%</span>
                <span className="font-mono text-[10px] text-text-dim flex items-center gap-1">
                  <span className="w-2 h-px bg-border-strong inline-block" />
                  {data.sloTarget}% target
                </span>
                <span className="font-mono text-[10px] text-text-dim">100%</span>
              </div>
            </div>
          </Card>

          {/* Write Availability */}
          <Card>
            <div className="p-5">
              <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-3">
                {t("availability.write")}
              </div>
              <div className={`font-display text-4xl font-semibold mb-4 ${availabilityColor(data.writeAvailability, data.sloTarget)}`}>
                {data.writeAvailability.toFixed(2)}
                <span className="text-xl font-normal ml-1 text-text-muted">%</span>
              </div>
              <div className="h-1.5 bg-bg-sunken rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${availabilityBarColor(data.writeAvailability, data.sloTarget)}`}
                  style={{ width: `${Math.min(data.writeAvailability, 100)}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="font-mono text-[10px] text-text-dim">0%</span>
                <span className="font-mono text-[10px] text-text-dim flex items-center gap-1">
                  <span className="w-2 h-px bg-border-strong inline-block" />
                  {data.sloTarget}% target
                </span>
                <span className="font-mono text-[10px] text-text-dim">100%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Key metrics ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Card>
            <div className="p-5">
              <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-3">
                {t("stats.requestRate")}
              </div>
              <div className="font-display text-3xl text-text">
                {data.totalRequestRate.toLocaleString()}
              </div>
              <div className="text-[10px] font-mono text-text-dim mt-1">
                {t("stats.requestRateSub")}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-3">
                {t("stats.errorRate")}
              </div>
              <div className={`font-display text-3xl ${errorRateColor(data.errorRate)}`}>
                {data.errorRate.toFixed(2)}
                <span className="text-xl font-normal ml-0.5 text-text-muted">%</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-3">
                {t("stats.p99Read")}
              </div>
              <div className={`font-display text-3xl ${latencyTextColor(data.latencyRead.p99)}`}>
                {data.latencyRead.p99}
                <span className="text-xl font-normal ml-1 text-text-muted">{t("stats.latencyUnit")}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-3">
                {t("stats.p99Write")}
              </div>
              <div className={`font-display text-3xl ${latencyTextColor(data.latencyWrite.p99)}`}>
                {data.latencyWrite.p99}
                <span className="text-xl font-normal ml-1 text-text-muted">{t("stats.latencyUnit")}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Verb rates + Latency ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

          {/* Request rate by verb */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t("verbRates.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              {data.verbRates.map((v) => (
                <div key={v.verb}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-text w-14">{v.verb}</span>
                      <span className="font-mono text-xs text-text-muted">
                        {v.ratePerSec} req/s
                      </span>
                    </div>
                    <span
                      className={`font-mono text-[11px] ${
                        v.errorRate > 0.1
                          ? "text-accent-warn"
                          : v.errorRate === 0
                          ? "text-text-dim"
                          : "text-text-muted"
                      }`}
                    >
                      {v.errorRate > 0 ? `${v.errorRate.toFixed(2)}% err` : "—"}
                    </span>
                  </div>
                  <div className="h-1.5 bg-bg-sunken rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${(v.ratePerSec / maxVerbRate) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Latency percentiles */}
          <Card>
            <CardHeader>
              <CardTitle>{t("latency.title")}</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-5">
              {(["read", "write"] as const).map((kind) => {
                const lat = kind === "read" ? data.latencyRead : data.latencyWrite;
                const maxMs = 200;
                return (
                  <div key={kind}>
                    <div className="text-[10px] font-mono tracking-wider text-text-dim uppercase mb-2">
                      {t(`latency.${kind}`)}
                    </div>
                    {(["p50", "p90", "p99"] as const).map((p) => (
                      <div key={p} className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[11px] text-text-muted">{t(`latency.${p}`)}</span>
                          <span className={`font-mono text-[11px] ${latencyTextColor(lat[p])}`}>
                            {lat[p]}ms
                          </span>
                        </div>
                        <div className="h-1 bg-bg-sunken rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${latencyColor(lat[p])}`}
                            style={{ width: `${Math.min((lat[p] / maxMs) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* ── Status code distribution ─────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>{t("statusCodes.title")}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-end gap-3 mb-3 h-16">
              {data.statusCodeRates.map((sc) => {
                const pct = (sc.ratePerSec / totalStatusRate) * 100;
                const barColors: Record<string, string> = {
                  success: "bg-accent",
                  warning: "bg-accent-warn",
                  critical: "bg-accent-crit",
                  muted: "bg-border",
                };
                return (
                  <div key={sc.code} className="flex flex-col items-center gap-1 flex-1">
                    <span className="font-mono text-[10px] text-text-dim">{pct.toFixed(1)}%</span>
                    <div className="w-full bg-bg-sunken rounded-sm overflow-hidden" style={{ height: `${Math.max(pct * 0.4, 4)}px` }}>
                      <div className={`h-full w-full ${barColors[sc.variant]}`} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              {data.statusCodeRates.map((sc) => {
                const badgeVariant = sc.variant === "muted" ? "muted" : sc.variant;
                return (
                  <div key={sc.code} className="flex items-center gap-2 flex-1">
                    <Badge variant={badgeVariant}>{sc.code}</Badge>
                    <span className="font-mono text-xs text-text-muted">
                      {sc.ratePerSec} {t("statusCodes.rate")}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* ── Work Queue Latency ──────────────────────────────────────────── */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>{t("workQueue.title")}</CardTitle>
          </CardHeader>
          <div className="divide-y divide-border">
            {data.workQueueControllers.map((ctrl) => (
              <div
                key={ctrl.name}
                className="grid grid-cols-[16px_1fr_180px_80px] items-center gap-4 px-4 py-2.5 hover:bg-bg-sunken/40 transition-colors"
              >
                {/* color dot */}
                <div className={`h-2 w-2 rounded-full ${ctrl.color.replace("stroke-", "bg-")}`} />

                {/* name + host */}
                <div className="min-w-0">
                  <span className="font-mono text-xs text-text truncate block">{ctrl.name}</span>
                  <span className="font-mono text-[10px] text-text-dim">{ctrl.host}</span>
                </div>

                {/* sparkline */}
                <div className="h-8 opacity-70">
                  <Sparkline
                    data={ctrl.sparkline}
                    strokeClass={ctrl.color}
                    fillClass={ctrl.color.replace("stroke-", "fill-") + "/10"}
                    height={32}
                  />
                </div>

                {/* last value */}
                <div className="text-right">
                  {ctrl.lastLatencyMs === null ? (
                    <span className="font-mono text-xs text-text-dim">{t("workQueue.noData")}</span>
                  ) : ctrl.lastLatencyMs >= 1000 ? (
                    <span className="font-mono text-xs text-accent-warn">
                      {(ctrl.lastLatencyMs / 1000).toFixed(2)} s
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-text-muted">
                      {ctrl.lastLatencyMs < 1
                        ? `${(ctrl.lastLatencyMs * 1000).toFixed(0)} µs`
                        : `${ctrl.lastLatencyMs.toFixed(1)} ms`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Memory / CPU / Goroutines ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Memory */}
          <Card>
            <CardHeader>
              <CardTitle>{t("resources.memory")}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-display text-2xl text-text">
                  {data.memory.current}
                </span>
                <span className="font-mono text-xs text-text-dim">{t("resources.mib")}</span>
              </div>
              <div className="h-16">
                <Sparkline data={data.memory.sparkline} height={64} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[10px] text-text-dim">
                  {Math.round(Math.min(...data.memory.sparkline))} MiB
                </span>
                <span className="font-mono text-[10px] text-text-dim">
                  {Math.round(Math.max(...data.memory.sparkline))} MiB
                </span>
              </div>
            </CardContent>
          </Card>

          {/* CPU */}
          <Card>
            <CardHeader>
              <CardTitle>{t("resources.cpu")}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-display text-2xl text-text">
                  {data.cpu.current.toFixed(3)}
                </span>
                <span className="font-mono text-xs text-text-dim">cores</span>
              </div>
              <div className="h-16">
                <Sparkline
                  data={data.cpu.sparkline}
                  strokeClass="stroke-accent-warn"
                  fillClass="fill-accent-warn/10"
                  height={64}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[10px] text-text-dim">
                  {Math.min(...data.cpu.sparkline).toFixed(3)}
                </span>
                <span className="font-mono text-[10px] text-text-dim">
                  {Math.max(...data.cpu.sparkline).toFixed(3)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Goroutines */}
          <Card>
            <CardHeader>
              <CardTitle>{t("resources.goroutines")}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-display text-2xl text-text">
                  {data.goroutines.current.toLocaleString()}
                </span>
              </div>
              <div className="h-16">
                <Sparkline
                  data={data.goroutines.sparkline}
                  strokeClass="stroke-accent-info"
                  fillClass="fill-accent-info/10"
                  height={64}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[10px] text-text-dim">
                  {Math.round(Math.min(...data.goroutines.sparkline)).toLocaleString()}
                </span>
                <span className="font-mono text-[10px] text-text-dim">
                  {Math.round(Math.max(...data.goroutines.sparkline)).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

      </PageContainer>
    </>
  );
}
