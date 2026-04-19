import { Layers } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";

export default function NamespacesPage() {
  return (
    <PlaceholderPage
      title="Namespaces"
      breadcrumbs={["Cluster"]}
      icon={Layers}
      description="Namespace inventory with resource counts, labels, and age. Supports quick filtering across the dashboard."
    />
  );
}
