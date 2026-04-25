import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { PVTable } from "@/features/persistent-volumes/pv-table";
import { getPersistentVolumes } from "@/services/pv-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function PersistentVolumesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getPersistentVolumes(clusterId);
  const t = await getTranslations("persistentVolumes");

  const boundCount     = items.filter((i) => i.status === "Bound").length;
  const availableCount = items.filter((i) => i.status === "Available").length;
  const releasedCount  = items.filter((i) => i.status === "Released").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),     value: items.length,   color: "text-text"        },
            { label: t("summary.bound"),     value: boundCount,     color: "text-accent"      },
            { label: t("summary.available"), value: availableCount, color: "text-accent-info" },
            { label: t("summary.released"),  value: releasedCount,  color: "text-accent-warn" },
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
        <PVTable items={items} />
      </PageContainer>
    </>
  );
}
