import type { StatefulSet } from "@/entities/statefulset";

export const MOCK_STATEFULSETS: StatefulSet[] = [
  { name: "postgres-primary",  namespace: "database",    status: "Running",  readyReplicas: 1, desiredReplicas: 1, serviceName: "postgres",       storageClass: "standard", age: "30d" },
  { name: "redis-cluster",     namespace: "cache",       status: "Running",  readyReplicas: 3, desiredReplicas: 3, serviceName: "redis",          storageClass: "standard", age: "21d" },
  { name: "elasticsearch",     namespace: "monitoring",  status: "Degraded", readyReplicas: 1, desiredReplicas: 3, serviceName: "elasticsearch",  storageClass: "fast-ssd", age: "5d"  },
  { name: "zookeeper",         namespace: "default",     status: "Running",  readyReplicas: 3, desiredReplicas: 3, serviceName: "zookeeper",      storageClass: "standard", age: "45d" },
  { name: "kafka",             namespace: "production",  status: "Updating", readyReplicas: 2, desiredReplicas: 3, serviceName: "kafka-headless", storageClass: "fast-ssd", age: "12d" },
  { name: "etcd-backup",       namespace: "kube-system", status: "Failed",   readyReplicas: 0, desiredReplicas: 1, serviceName: "etcd-backup",                              age: "2h"  },
];
