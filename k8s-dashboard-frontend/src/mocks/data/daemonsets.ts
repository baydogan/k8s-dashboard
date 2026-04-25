import type { DaemonSet } from "@/entities/daemonset";

export const MOCK_DAEMONSETS: DaemonSet[] = [
  { name: "node-exporter", namespace: "monitoring",  status: "Available",   desired: 4, current: 4, ready: 4, available: 4, upToDate: 4, age: "28d" },
  { name: "calico-node",   namespace: "kube-system", status: "Available",   desired: 4, current: 4, ready: 4, available: 4, upToDate: 4, age: "60d" },
  { name: "kube-proxy",    namespace: "kube-system", status: "Progressing", desired: 4, current: 4, ready: 4, available: 3, upToDate: 3, age: "60d" },
  { name: "fluentd",       namespace: "logging",     status: "Degraded",    desired: 4, current: 4, ready: 3, available: 3, upToDate: 4, age: "14d" },
  { name: "csi-driver",    namespace: "kube-system", status: "Available",   desired: 4, current: 4, ready: 4, available: 4, upToDate: 4, age: "60d" },
];
