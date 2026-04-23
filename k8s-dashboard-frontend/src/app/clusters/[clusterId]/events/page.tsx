import { Header } from "@/shared/components/layout/header";
import { PageContainer } from "@/shared/components/layout/page-container";
import { getEvents } from "@/services/event-service";
import { getTranslations } from "next-intl/server";
import { EventsTable } from "@/features/events/events-table";

interface EventsPageProps {
  params: Promise<{ clusterId: string }>;
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { clusterId } = await params;
  const events = await getEvents(clusterId);
  const t = await getTranslations("events");

  const warningCount = events.filter((e) => e.type === "Warning").length;
  const criticalCount = events.filter((e) => e.type === "Critical").length;

  return (
    <>
      <Header title={t("title")} breadcrumbs={[t("breadcrumb")]} />
      <PageContainer>
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-border">
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.total")}
            </div>
            <div className="font-display text-2xl text-text">{events.length}</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.warnings")}
            </div>
            <div className="font-display text-2xl text-accent-warn">{warningCount}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase mb-1">
              {t("summary.critical")}
            </div>
            <div className="font-display text-2xl text-accent-crit">{criticalCount}</div>
          </div>
        </div>

        <EventsTable events={events} />
      </PageContainer>
    </>
  );
}
