import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { ClusterRolesTable } from "@/features/cluster-roles/cluster-roles-table";
import { getClusterRoles } from "@/services/cluster-role-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function ClusterRolesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getClusterRoles(clusterId);
  const t = await getTranslations("clusterRoles");

  const customCount  = items.filter((i) => !i.builtin).length;
  const builtinCount = items.filter((i) => i.builtin).length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),   value: items.length,  color: "text-text"        },
            { label: t("summary.custom"),  value: customCount,   color: "text-accent"      },
            { label: t("summary.builtin"), value: builtinCount,  color: "text-accent-info" },
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
        <ClusterRolesTable items={items} />
      </PageContainer>
    </>
  );
}
