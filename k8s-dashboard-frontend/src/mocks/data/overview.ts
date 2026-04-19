export interface OverviewStat {
  label: string;
  value: string;
  sub: string;
  trend: string;
}

export interface OverviewEvent {
  type: "normal" | "warning" | "critical";
  resource: string;
  message: string;
  time: string;
}

export interface ResourceMetric {
  label: string;
  value: number;
  color: string;
}

export interface OverviewData {
  stats: OverviewStat[];
  recentEvents: OverviewEvent[];
  resourceMetrics: ResourceMetric[];
  workloads: { running: number; pending: number; failed: number; succeeded: number };
}

export const MOCK_OVERVIEW: OverviewData = {
  stats: [
    { label: "Nodes", value: "12", sub: "all ready", trend: "+0" },
    { label: "Pods", value: "184", sub: "running", trend: "+4" },
    { label: "Namespaces", value: "8", sub: "active", trend: "0" },
    { label: "Events", value: "23", sub: "last hour", trend: "+12" },
  ],
  recentEvents: [
    { type: "normal", resource: "pod/api-gateway-7f4d", message: "Scaled up replica set", time: "2m" },
    { type: "warning", resource: "pod/worker-queue-3a21", message: "BackOff restarting failed container", time: "5m" },
    { type: "normal", resource: "deployment/frontend", message: "Deployment rolled out successfully", time: "12m" },
    { type: "critical", resource: "node/worker-04", message: "Node pressure: memory exceeded threshold", time: "18m" },
    { type: "normal", resource: "pod/cron-cleanup", message: "Successfully pulled image", time: "34m" },
  ],
  resourceMetrics: [
    { label: "CPU Usage", value: 47, color: "accent" },
    { label: "Memory Usage", value: 62, color: "accent-warn" },
    { label: "Storage", value: 31, color: "accent-info" },
  ],
  workloads: { running: 178, pending: 4, failed: 2, succeeded: 0 },
};
