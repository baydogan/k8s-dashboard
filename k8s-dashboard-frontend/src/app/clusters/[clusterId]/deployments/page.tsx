import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { DeploymentsTable } from "@/features/deployments/deployments-table";
import { getDeployments } from "@/services/deployment-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function DeploymentsPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getDeployments(clusterId);
  const t = await getTranslations("deployments");

  const availableCount   = items.filter((d) => d.status === "Available").length;
  const progressingCount = items.filter((d) => d.status === "Progressing").length;
  const failedCount      = items.filter((d) => d.status === "Failed").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),       value: items.length,    color: "text-text"        },
            { label: t("summary.available"),   value: availableCount,  color: "text-accent"      },
            { label: t("summary.progressing"), value: progressingCount,color: "text-accent-info" },
            { label: t("summary.failed"),      value: failedCount,     color: "text-accent-crit" },
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
        <DeploymentsTable items={items} />
      </PageContainer>
    </>
  );
}
