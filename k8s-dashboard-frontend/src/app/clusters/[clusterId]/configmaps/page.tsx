import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { ConfigMapsTable } from "@/features/config-maps/config-maps-table";
import { getConfigMaps } from "@/services/config-map-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function ConfigMapsPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getConfigMaps(clusterId);
  const t = await getTranslations("configMaps");

  const totalKeys = items.reduce((sum, i) => sum + i.dataKeys.length, 0);
  const namespacesCount = new Set(items.map((i) => i.namespace)).size;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),      value: items.length,    color: "text-text"        },
            { label: t("summary.namespaces"),  value: namespacesCount, color: "text-accent"      },
            { label: t("summary.keys"),        value: totalKeys,       color: "text-accent-info" },
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
        <ConfigMapsTable items={items} />
      </PageContainer>
    </>
  );
}
