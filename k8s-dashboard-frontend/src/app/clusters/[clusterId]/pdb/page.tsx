import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { PDBTable } from "@/features/pdb/pdb-table";
import { getPodDisruptionBudgets } from "@/services/pdb-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function PDBPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getPodDisruptionBudgets(clusterId);
  const t = await getTranslations("pdb");

  const safeCount         = items.filter((i) => i.disruptionsAllowed > 0).length;
  const noDisruptionCount = items.filter((i) => i.disruptionsAllowed === 0).length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),        value: items.length,      color: "text-text"        },
            { label: t("summary.safe"),         value: safeCount,         color: "text-accent"      },
            { label: t("summary.noDisruption"), value: noDisruptionCount, color: "text-accent-warn" },
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
        <PDBTable items={items} />
      </PageContainer>
    </>
  );
}
