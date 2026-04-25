import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { PodsTable } from "@/features/pods/pods-table";
import { getPods } from "@/services/pod-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function PodsPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getPods(clusterId);
  const t = await getTranslations("pods");

  const runningCount = items.filter((p) => p.status === "Running").length;
  const failingCount = items.filter((p) => p.status === "CrashLoopBackOff" || p.status === "Failed").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),   value: items.length,  color: "text-text"        },
            { label: t("summary.running"), value: runningCount,  color: "text-accent"      },
            { label: t("summary.failing"), value: failingCount,  color: "text-accent-crit" },
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
        <PodsTable items={items} />
      </PageContainer>
    </>
  );
}
