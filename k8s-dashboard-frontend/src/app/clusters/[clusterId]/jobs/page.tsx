import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { JobsTable } from "@/features/jobs/jobs-table";
import { getJobs } from "@/services/job-service";
import { getTranslations } from "next-intl/server";

interface Props { params: Promise<{ clusterId: string }> }

export default async function JobsPage({ params }: Props) {
  const { clusterId } = await params;
  const items = await getJobs(clusterId);
  const t = await getTranslations("jobs");

  const completeCount = items.filter((i) => i.status === "Complete").length;
  const runningCount  = items.filter((i) => i.status === "Running").length;
  const failedCount   = items.filter((i) => i.status === "Failed").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          {[
            { label: t("summary.total"),    value: items.length,  color: "text-text"        },
            { label: t("summary.complete"), value: completeCount, color: "text-accent"      },
            { label: t("summary.running"),  value: runningCount,  color: "text-accent-info" },
            { label: t("summary.failed"),   value: failedCount,   color: "text-accent-crit" },
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
        <JobsTable items={items} />
      </PageContainer>
    </>
  );
}
