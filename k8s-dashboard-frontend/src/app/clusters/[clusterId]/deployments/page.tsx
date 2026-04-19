import { Boxes } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";

export default function DeploymentsPage() {
  return (
    <PlaceholderPage
      title="Deployments"
      breadcrumbs={["Workloads"]}
      icon={Boxes}
      description="Deployment overview with replica status, rollout history, and image versions. Scale and restart actions will live here."
    />
  );
}
