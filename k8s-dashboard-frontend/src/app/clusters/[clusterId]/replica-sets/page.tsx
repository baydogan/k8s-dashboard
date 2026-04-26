import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { ReplicaSetsTable } from "@/features/replica-sets/replica-sets-table";
import { getReplicaSets } from "@/services/replica-set-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function ReplicaSetsPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getReplicaSets(clusterId);
  const t = await getTranslations("replicaSets");

  const availableCount   = items.filter((i) => i.status === "Available").length;
  const degradedCount    = items.filter((i) => i.status === "Degraded").length;
  const unavailableCount = items.filter((i) => i.status === "Unavailable").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),       value: items.length,     color: "text-text"        },
            { label: t("summary.available"),   value: availableCount,   color: "text-accent"      },
            { label: t("summary.degraded"),    value: degradedCount,    color: "text-accent-warn" },
            { label: t("summary.unavailable"), value: unavailableCount, color: "text-accent-crit" },
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
        <ReplicaSetsTable items={items} />
      </PageContainer>
    </>
  );
}
