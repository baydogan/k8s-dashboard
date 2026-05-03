import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { GRPCRoutesTable } from "@/features/grpc-routes/grpc-routes-table";
import { getGRPCRoutes } from "@/services/grpc-route-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function GRPCRoutesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getGRPCRoutes(clusterId);
  const t = await getTranslations("grpcRoutes");

  const totalRules   = items.reduce((sum, i) => sum + i.rules, 0);
  const gatewayCount = new Set(items.flatMap((i) => i.parentRefs)).size;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),    value: items.length, color: "text-text"        },
            { label: t("summary.gateways"), value: gatewayCount, color: "text-accent"      },
            { label: t("summary.rules"),    value: totalRules,   color: "text-accent-info" },
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
        <GRPCRoutesTable items={items} />
      </PageContainer>
    </>
  );
}
