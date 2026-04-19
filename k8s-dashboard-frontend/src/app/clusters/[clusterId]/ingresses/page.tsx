import { Globe } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";

export default function IngressesPage() {
  return (
    <PlaceholderPage
      title="Ingresses"
      breadcrumbs={["Network"]}
      icon={Globe}
      description="Ingress rules, TLS certificates, and domain routing. Tracks which services are exposed externally."
    />
  );
}
