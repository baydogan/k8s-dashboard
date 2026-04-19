export interface AiSuggestedPrompt {
  icon: string;
  labelKey: string;
  query: string;
}

export const MOCK_AI_SUGGESTED_PROMPTS: AiSuggestedPrompt[] = [
  { icon: "AlertTriangle", labelKey: "prompts.unhealthyPods", query: "Which pods are in a crash loop or error state right now?" },
  { icon: "Cpu", labelKey: "prompts.cpuHogs", query: "Which nodes or pods are consuming the most CPU?" },
  { icon: "MemoryStick", labelKey: "prompts.memoryPressure", query: "Are there any containers close to their memory limits?" },
  { icon: "Activity", labelKey: "prompts.recentEvents", query: "Summarise the most critical cluster events from the last hour." },
  { icon: "Network", labelKey: "prompts.serviceHealth", query: "Are all services reachable and have healthy endpoints?" },
];

export const MOCK_AI_RESPONSES: Record<string, string> = {
  default:
    "I've analysed your cluster state.\n\n→ All 3 nodes are Ready\n→ 42/45 pods are Running\n→ 3 pods in CrashLoopBackOff: nginx-proxy-7d9f (default), redis-cache-2 (production), worker-job-8x (staging)\n\nRecommendation: Check logs with `kubectl logs nginx-proxy-7d9f -n default --previous` to identify the root cause.",
  cpu:
    "CPU utilisation across nodes:\n\n→ node-01  ████████░░  78% (HIGH)\n→ node-02  ████░░░░░░  42%\n→ node-03  ██░░░░░░░░  21%\n\nTop consumers:\n1. ml-inference-pod (production)  — 3.2 cores\n2. prometheus-server (monitoring) — 1.8 cores\n3. api-gateway-5f8d (default)     — 0.9 cores\n\nConsider adding a HorizontalPodAutoscaler for ml-inference-pod.",
  memory:
    "Memory pressure detected:\n\n→ redis-cache-2 is at 94% of its 512Mi limit\n→ worker-job-8x exceeded its limit and was OOMKilled 3 times\n\nSuggested fix:\n```\nresources:\n  limits:\n    memory: '1Gi'\n  requests:\n    memory: '512Mi'\n```",
  events:
    "Critical events in the last hour:\n\n[12:04] OOMKilled     worker-job-8x / staging\n[12:11] BackOff       redis-cache-2 restarting\n[12:23] NodeNotReady  node-01 recovered after 2m\n[12:47] PVCPending    data-volume-3 waiting for PV\n[13:01] Unhealthy     liveness probe failed on api-v2\n\n5 warnings, 1 critical. Cluster is degraded.",
  network:
    "Service endpoint health:\n\n→ api-gateway       ✓  3/3 endpoints ready\n→ frontend-svc      ✓  2/2 endpoints ready\n→ redis-service     ✗  0/1 endpoints (pod down)\n→ postgres-svc      ✓  1/1 endpoints ready\n→ metrics-server    ✓  1/1 endpoints ready\n\nredis-service has no healthy endpoints. This is likely causing downstream failures in api-gateway.",
};
