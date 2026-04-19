import { Globe } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";
import { getTranslations } from "next-intl/server";

export default async function IngressesPage() {
  const t = await getTranslations("placeholder.ingresses");
  return (
    <PlaceholderPage
      title={t("title")}
      breadcrumbs={[t("breadcrumb")]}
      icon={Globe}
      description={t("description")}
    />
  );
}
