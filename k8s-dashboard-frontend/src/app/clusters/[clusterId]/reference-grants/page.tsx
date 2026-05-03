import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { ReferenceGrantsTable } from "@/features/reference-grants/reference-grants-table";
import { getReferenceGrants } from "@/services/reference-grant-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function ReferenceGrantsPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getReferenceGrants(clusterId);
  const t = await getTranslations("referenceGrants");

  const namespacesCount    = new Set(items.map((i) => i.namespace)).size;
  const crossNsCount       = items.filter((i) => i.fromNamespace !== i.namespace).length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),      value: items.length,   color: "text-text"        },
            { label: t("summary.namespaces"), value: namespacesCount, color: "text-accent"      },
            { label: t("summary.crossNs"),    value: crossNsCount,    color: "text-accent-warn" },
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
        <ReferenceGrantsTable items={items} />
      </PageContainer>
    </>
  );
}
