import { Boxes } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";
import { getTranslations } from "next-intl/server";

export default async function DeploymentsPage() {
  const t = await getTranslations("placeholder.deployments");
  return (
    <PlaceholderPage
      title={t("title")}
      breadcrumbs={[t("breadcrumb")]}
      icon={Boxes}
      description={t("description")}
    />
  );
}
