import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { NetworkPoliciesTable } from "@/features/network-policies/network-policies-table";
import { getNetworkPolicies } from "@/services/network-policy-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function NetworkPoliciesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getNetworkPolicies(clusterId);
  const t = await getTranslations("networkPolicies");

  const namespacesCount = new Set(items.map((i) => i.namespace)).size;
  const denyAllCount = items.filter((i) => i.ingressRules === 0 && i.egressRules === 0 && i.policyTypes.length === 2).length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),      value: items.length,    color: "text-text"        },
            { label: t("summary.namespaces"),  value: namespacesCount, color: "text-accent"      },
            { label: t("summary.denyAll"),     value: denyAllCount,    color: "text-accent-warn" },
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
        <NetworkPoliciesTable items={items} />
      </PageContainer>
    </>
  );
}
