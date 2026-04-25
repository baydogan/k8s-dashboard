import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { ServicesTable } from "@/features/services/services-table";
import { getKubernetesServices } from "@/services/svc-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function ServicesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getKubernetesServices(clusterId);
  const t = await getTranslations("services");

  const lbCount = items.filter((i) => i.type === "LoadBalancer").length;
  const npCount = items.filter((i) => i.type === "NodePort").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),        value: items.length, color: "text-text"        },
            { label: t("summary.loadBalancer"), value: lbCount,      color: "text-accent"      },
            { label: t("summary.nodePort"),     value: npCount,      color: "text-accent-info" },
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
        <ServicesTable items={items} />
      </PageContainer>
    </>
  );
}
