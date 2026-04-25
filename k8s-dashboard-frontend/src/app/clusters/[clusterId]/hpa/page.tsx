import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { HPATable } from "@/features/hpa/hpa-table";
import { getHPAs } from "@/services/hpa-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

function getStatus(current: number, desired: number) {
  if (current < desired) return "ScalingUp";
  if (current > desired) return "ScalingDown";
  return "AtTarget";
}

export default async function HPAPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getHPAs(clusterId);
  const t = await getTranslations("hpa");

  const atTarget    = items.filter((i) => getStatus(i.currentReplicas, i.desiredReplicas) === "AtTarget").length;
  const scalingUp   = items.filter((i) => getStatus(i.currentReplicas, i.desiredReplicas) === "ScalingUp").length;
  const scalingDown = items.filter((i) => getStatus(i.currentReplicas, i.desiredReplicas) === "ScalingDown").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),       value: items.length, color: "text-text"        },
            { label: t("summary.atTarget"),    value: atTarget,     color: "text-accent"      },
            { label: t("summary.scalingUp"),   value: scalingUp,    color: "text-accent-info" },
            { label: t("summary.scalingDown"), value: scalingDown,  color: "text-accent-warn" },
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
        <HPATable items={items} />
      </PageContainer>
    </>
  );
}
