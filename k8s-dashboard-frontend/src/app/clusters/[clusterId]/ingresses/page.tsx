import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { IngressesTable } from "@/features/ingresses/ingresses-table";
import { getIngresses } from "@/services/ingress-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function IngressesPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getIngresses(clusterId);
  const t = await getTranslations("ingresses");

  const tlsCount   = items.filter((i) => i.tls).length;
  const noTlsCount = items.filter((i) => !i.tls).length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),   value: items.length, color: "text-text"        },
            { label: t("summary.withTls"), value: tlsCount,     color: "text-accent"      },
            { label: t("summary.noTls"),   value: noTlsCount,   color: "text-accent-warn" },
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
        <IngressesTable items={items} />
      </PageContainer>
    </>
  );
}
