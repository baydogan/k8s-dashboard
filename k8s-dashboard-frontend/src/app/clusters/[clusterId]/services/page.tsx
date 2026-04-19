import { Network } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";
import { getTranslations } from "next-intl/server";

export default async function ServicesPage() {
  const t = await getTranslations("placeholder.services");
  return (
    <PlaceholderPage
      title={t("title")}
      breadcrumbs={[t("breadcrumb")]}
      icon={Network}
      description={t("description")}
    />
  );
}
