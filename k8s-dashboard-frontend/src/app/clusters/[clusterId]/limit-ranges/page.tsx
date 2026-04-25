import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { getLimitRanges } from "@/services/limit-range-service";
import { getTranslations } from "next-intl/server";
import type { LimitType } from "@/entities/limit-range";

interface Props { params: Promise<{ clusterId: string }> }

function typeVariant(t: LimitType) {
  switch (t) {
    case "Container":              return "info"  as const;
    case "Pod":                    return "muted" as const;
    case "PersistentVolumeClaim":  return "warning" as const;
  }
}

export default async function LimitRangesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getLimitRanges(clusterId);
  const t = await getTranslations("limitRanges");

  const namespacesCount = new Set(items.map((i) => i.namespace)).size;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),      value: items.length,    color: "text-text"   },
            { label: t("summary.namespaces"),  value: namespacesCount, color: "text-accent" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-6">
              {i > 0 && <div className="h-10 w-px bg-border" />}
              <div>
                <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">{s.label}</div>
                <div className={`font-display text-2xl ${s.color}`}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map((item, qi) => (
            <Card key={`${item.namespace}/${item.name}`} className="animate-slide-up" style={{ animationDelay: `${qi * 60}ms` }}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <span className="font-mono text-[10px] text-text-dim">{item.namespace} · {item.age}</span>
              </CardHeader>
              <CardContent className="pt-3">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border">
                      {[t("columns.type"), t("columns.resource"), t("columns.min"), t("columns.max"), t("columns.default"), t("columns.defaultRequest")].map((h, i) => (
                        <th key={i} className="pb-2 text-[10px] font-mono tracking-[0.15em] text-text-dim uppercase font-normal pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {item.limits.map((limit, li) => (
                      <tr key={li}>
                        <td className="py-2 pr-4"><Badge variant={typeVariant(limit.type)}>{limit.type}</Badge></td>
                        <td className="py-2 pr-4 font-mono text-[11px] text-text-muted uppercase tracking-wider">{limit.resource}</td>
                        <td className="py-2 pr-4 font-mono text-[11px] text-text-dim">{limit.min ?? "—"}</td>
                        <td className="py-2 pr-4 font-mono text-[11px] text-text-dim">{limit.max ?? "—"}</td>
                        <td className="py-2 pr-4 font-mono text-[11px] text-accent">{limit.default ?? "—"}</td>
                        <td className="py-2 font-mono text-[11px] text-text-muted">{limit.defaultRequest ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
