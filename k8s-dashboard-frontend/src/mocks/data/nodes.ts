import type { K8sNode } from "@/entities/node";

export const MOCK_NODES: K8sNode[] = [
  { name: "control-plane-01", status: "Ready", roles: ["control-plane", "master"], version: "v1.28.3", cpuUsage: 32, memoryUsage: 58, podCount: 8, age: "180d", internalIP: "10.0.1.10", os: "Ubuntu 22.04" },
  { name: "worker-01", status: "Ready", roles: ["worker"], version: "v1.28.3", cpuUsage: 67, memoryUsage: 72, podCount: 28, age: "180d", internalIP: "10.0.1.20", os: "Ubuntu 22.04" },
  { name: "worker-02", status: "Ready", roles: ["worker"], version: "v1.28.3", cpuUsage: 45, memoryUsage: 61, podCount: 24, age: "180d", internalIP: "10.0.1.21", os: "Ubuntu 22.04" },
  { name: "worker-03", status: "Ready", roles: ["worker"], version: "v1.28.3", cpuUsage: 78, memoryUsage: 84, podCount: 31, age: "145d", internalIP: "10.0.1.22", os: "Ubuntu 22.04" },
  { name: "worker-04", status: "NotReady", roles: ["worker"], version: "v1.28.3", cpuUsage: 0, memoryUsage: 0, podCount: 0, age: "90d", internalIP: "10.0.1.23", os: "Ubuntu 22.04" },
];
