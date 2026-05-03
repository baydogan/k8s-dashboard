import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { GatewaysTable } from "@/features/gateways/gateways-table";
import { getGateways } from "@/services/gateway-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function GatewaysPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getGateways(clusterId);
  const t = await getTranslations("gateways");

  const readyCount    = items.filter((i) => i.status === "Ready").length;
  const notReadyCount = items.filter((i) => i.status === "NotReady").length;
  const pendingCount  = items.filter((i) => i.status === "Pending").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),    value: items.length,  color: "text-text"        },
            { label: t("summary.ready"),    value: readyCount,    color: "text-accent"      },
            { label: t("summary.notReady"), value: notReadyCount, color: "text-accent-crit" },
            { label: t("summary.pending"),  value: pendingCount,  color: "text-accent-info" },
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
        <GatewaysTable items={items} />
      </PageContainer>
    </>
  );
}
