import type { PersistentVolumeClaim } from "@/entities/persistent-volume-claim";

export const MOCK_PERSISTENT_VOLUME_CLAIMS: PersistentVolumeClaim[] = [
  { name: "postgres-primary-pvc",  namespace: "database",   status: "Bound",   volume: "postgres-pv-0",      capacity: "20Gi",  accessModes: ["ReadWriteOnce"], storageClass: "standard", age: "30d" },
  { name: "redis-pvc",             namespace: "cache",      status: "Bound",   volume: "redis-pv-0",         capacity: "5Gi",   accessModes: ["ReadWriteOnce"], storageClass: "standard", age: "21d" },
  { name: "elasticsearch-pvc-0",   namespace: "monitoring", status: "Bound",   volume: "elasticsearch-pv-0", capacity: "50Gi",  accessModes: ["ReadWriteOnce"], storageClass: "fast-ssd", age: "5d"  },
  { name: "elasticsearch-pvc-1",   namespace: "monitoring", status: "Pending", volume: null,                 capacity: null,    accessModes: ["ReadWriteOnce"], storageClass: "fast-ssd", age: "2h"  },
  { name: "kafka-pvc-0",           namespace: "production", status: "Bound",   volume: "kafka-pv-0",         capacity: "100Gi", accessModes: ["ReadWriteOnce"], storageClass: "fast-ssd", age: "12d" },
  { name: "logs-pvc",              namespace: "logging",    status: "Lost",    volume: null,                 capacity: null,    accessModes: ["ReadWriteMany"], storageClass: "standard", age: "5d"  },
];
