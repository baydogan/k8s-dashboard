import { Layers } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";
import { getTranslations } from "next-intl/server";

export default async function NamespacesPage() {
  const t = await getTranslations("placeholder.namespaces");
  return (
    <PlaceholderPage
      title={t("title")}
      breadcrumbs={[t("breadcrumb")]}
      icon={Layers}
      description={t("description")}
    />
  );
}
