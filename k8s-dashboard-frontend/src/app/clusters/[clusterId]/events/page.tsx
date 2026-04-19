import { Activity } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";
import { getTranslations } from "next-intl/server";

export default async function EventsPage() {
  const t = await getTranslations("placeholder.events");
  return (
    <PlaceholderPage
      title={t("title")}
      breadcrumbs={[t("breadcrumb")]}
      icon={Activity}
      description={t("description")}
    />
  );
}
