import { Activity } from "lucide-react";
import { PlaceholderPage } from "@/shared/components/layout/placeholder-page";

export default function EventsPage() {
  return (
    <PlaceholderPage
      title="Events"
      breadcrumbs={["Overview"]}
      icon={Activity}
      description="Real-time cluster events stream via SSE. Will show warnings, errors, and state transitions as they happen."
    />
  );
}
