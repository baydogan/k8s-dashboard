import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { getResourceQuotas } from "@/services/resource-quota-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

function usageColor(pct: number) {
  if (pct >= 90) return "bg-accent-crit";
  if (pct >= 70) return "bg-accent-warn";
  return "bg-accent";
}

function usageTextColor(pct: number) {
  if (pct >= 90) return "text-accent-crit";
  if (pct >= 70) return "text-accent-warn";
  return "text-accent";
}

export default async function ResourceQuotasPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getResourceQuotas(clusterId);
  const t = await getTranslations("resourceQuotas");

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">{t("summary.total")}</div>
            <div className="font-display text-2xl text-text">{items.length}</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">{t("summary.namespaces")}</div>
            <div className="font-display text-2xl text-accent">{new Set(items.map((i) => i.namespace)).size}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((quota, qi) => (
            <Card key={quota.name} className="animate-slide-up" style={{ animationDelay: `${qi * 60}ms` }}>
              <CardHeader>
                <CardTitle>{quota.name}</CardTitle>
                <span className="font-mono text-[10px] text-text-dim">{quota.namespace} · {quota.age}</span>
              </CardHeader>
              <CardContent className="pt-3 space-y-3">
                {quota.items.map((item) => {
                  const pct = Math.min((item.usedRaw / item.hardRaw) * 100, 100);
                  return (
                    <div key={item.resource}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">{item.resource}</span>
                        <span className={`font-mono text-[11px] ${usageTextColor(pct)}`}>
                          {item.used} / {item.hard}
                        </span>
                      </div>
                      <div className="h-1.5 bg-bg-sunken rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${usageColor(pct)}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="mt-0.5 text-right">
                        <span className={`font-mono text-[10px] ${usageTextColor(pct)}`}>{pct.toFixed(0)}%</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
