import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { PVCTable } from "@/features/persistent-volume-claims/pvc-table";
import { getPersistentVolumeClaims } from "@/services/pvc-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function PersistentVolumeClaimsPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getPersistentVolumeClaims(clusterId);
  const t = await getTranslations("persistentVolumeClaims");

  const boundCount   = items.filter((i) => i.status === "Bound").length;
  const pendingCount = items.filter((i) => i.status === "Pending").length;
  const lostCount    = items.filter((i) => i.status === "Lost").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),   value: items.length,  color: "text-text"        },
            { label: t("summary.bound"),   value: boundCount,    color: "text-accent"      },
            { label: t("summary.pending"), value: pendingCount,  color: "text-accent-info" },
            { label: t("summary.lost"),    value: lostCount,     color: "text-accent-crit" },
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
        <PVCTable items={items} />
      </PageContainer>
    </>
  );
}
