import type { HorizontalPodAutoscaler } from "@/entities/hpa";

export const MOCK_HPAS: HorizontalPodAutoscaler[] = [
  { name: "api-gateway-hpa",  namespace: "production", targetKind: "Deployment", targetName: "api-gateway",  minReplicas: 2, maxReplicas: 10, currentReplicas: 3, desiredReplicas: 4, currentMetric: "CPU: 72%", age: "14d" },
  { name: "frontend-hpa",     namespace: "production", targetKind: "Deployment", targetName: "frontend",     minReplicas: 1, maxReplicas: 5,  currentReplicas: 2, desiredReplicas: 2, currentMetric: "CPU: 34%", age: "6d"  },
  { name: "worker-queue-hpa", namespace: "production", targetKind: "Deployment", targetName: "worker-queue", minReplicas: 2, maxReplicas: 20, currentReplicas: 5, desiredReplicas: 8, currentMetric: "CPU: 89%", age: "12d" },
  { name: "auth-service-hpa", namespace: "production", targetKind: "Deployment", targetName: "auth-service", minReplicas: 1, maxReplicas: 4,  currentReplicas: 2, desiredReplicas: 1, currentMetric: "CPU: 12%", age: "9d"  },
  { name: "redis-hpa",        namespace: "cache",      targetKind: "Deployment", targetName: "redis",        minReplicas: 2, maxReplicas: 6,  currentReplicas: 2, desiredReplicas: 2, currentMetric: "CPU: 28%", age: "21d" },
];
