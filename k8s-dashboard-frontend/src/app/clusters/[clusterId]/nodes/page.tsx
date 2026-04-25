import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { NodesGrid } from "@/features/nodes/nodes-grid";
import { getNodes } from "@/services/node-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function NodesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getNodes(clusterId);
  const t = await getTranslations("nodes");

  const readyCount    = items.filter((n) => n.status === "Ready").length;
  const notReadyCount = items.filter((n) => n.status !== "Ready").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("status.ready"),    value: readyCount,    color: "text-accent"      },
            { label: t("status.notReady"), value: notReadyCount, color: "text-accent-crit" },
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
        <NodesGrid items={items} />
      </PageContainer>
    </>
  );
}
