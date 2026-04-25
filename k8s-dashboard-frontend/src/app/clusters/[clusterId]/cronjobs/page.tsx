import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { CronJobsTable } from "@/features/cronjobs/cronjobs-table";
import { getCronJobs } from "@/services/cronjob-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function CronJobsPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getCronJobs(clusterId);
  const t = await getTranslations("cronJobs");

  const activeCount    = items.filter((i) => i.status === "Active").length;
  const suspendedCount = items.filter((i) => i.status === "Suspended").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),     value: items.length,   color: "text-text"       },
            { label: t("summary.active"),    value: activeCount,    color: "text-accent"     },
            { label: t("summary.suspended"), value: suspendedCount, color: "text-text-muted" },
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
        <CronJobsTable items={items} />
      </PageContainer>
    </>
  );
}
