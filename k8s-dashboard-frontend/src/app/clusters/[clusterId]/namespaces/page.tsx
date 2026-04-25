import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { NamespacesTable } from "@/features/namespaces/namespaces-table";
import { getNamespaces } from "@/services/namespace-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function NamespacesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getNamespaces(clusterId);
  const t = await getTranslations("namespaces");

  const activeCount      = items.filter((n) => n.status === "Active").length;
  const terminatingCount = items.filter((n) => n.status === "Terminating").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),       value: items.length,    color: "text-text"        },
            { label: t("summary.active"),      value: activeCount,     color: "text-accent"      },
            { label: t("summary.terminating"), value: terminatingCount,color: "text-accent-warn" },
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
        <NamespacesTable items={items} />
      </PageContainer>
    </>
  );
}
