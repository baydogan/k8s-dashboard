import { Network } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";

export default function ServicesPage() {
  return (
    <PlaceholderPage
      title="Services"
      breadcrumbs={["Network"]}
      icon={Network}
      description="Service discovery view showing ClusterIP, NodePort, and LoadBalancer configurations with endpoint health."
    />
  );
}
