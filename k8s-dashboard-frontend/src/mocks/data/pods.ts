import type { Pod } from "@/entities/pod";

export const MOCK_PODS: Pod[] = [
  { name: "api-gateway-7f4d8b-x9k2n", namespace: "production", status: "Running", nodeName: "worker-01", restartCount: 0, ready: "2/2", age: "3d", ip: "10.42.1.15", containers: ["api", "sidecar"] },
  { name: "frontend-5c8d9f-m3p4q", namespace: "production", status: "Running", nodeName: "worker-02", restartCount: 0, ready: "1/1", age: "12h", ip: "10.42.2.8", containers: ["web"] },
  { name: "worker-queue-3a21b-ks83d", namespace: "production", status: "CrashLoopBackOff", nodeName: "worker-03", restartCount: 14, ready: "0/1", age: "2h", ip: "10.42.3.22", containers: ["worker"] },
  { name: "postgres-primary-0", namespace: "database", status: "Running", nodeName: "worker-01", restartCount: 0, ready: "1/1", age: "7d", ip: "10.42.1.33", containers: ["postgres"] },
  { name: "redis-cache-6d7e8f-p1q2r", namespace: "cache", status: "Running", nodeName: "worker-02", restartCount: 1, ready: "1/1", age: "5d", ip: "10.42.2.44", containers: ["redis"] },
  { name: "cron-cleanup-28734-vxn9w", namespace: "default", status: "Succeeded", nodeName: "worker-04", restartCount: 0, ready: "0/1", age: "34m", ip: "10.42.4.5", containers: ["cleanup"] },
  { name: "metrics-collector-x7y8z", namespace: "monitoring", status: "Pending", nodeName: "-", restartCount: 0, ready: "0/1", age: "1m", containers: ["metrics"] },
];
