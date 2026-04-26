import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { EndpointSlicesTable } from "@/features/endpoint-slices/endpoint-slices-table";
import { getEndpointSlices } from "@/services/endpoint-slice-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function EndpointSlicesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getEndpointSlices(clusterId);
  const t = await getTranslations("endpointSlices");

  const totalEndpoints  = items.reduce((sum, i) => sum + i.totalEndpoints, 0);
  const readyEndpoints  = items.reduce((sum, i) => sum + i.readyEndpoints, 0);
  const ipv6Count       = items.filter((i) => i.addressType === "IPv6").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),          value: items.length,   color: "text-text"        },
            { label: t("summary.readyEndpoints"),  value: readyEndpoints, color: "text-accent"      },
            { label: t("summary.totalEndpoints"),  value: totalEndpoints, color: "text-accent-info" },
            { label: t("summary.ipv6"),            value: ipv6Count,      color: "text-accent-warn" },
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
        <EndpointSlicesTable items={items} />
      </PageContainer>
    </>
  );
}
