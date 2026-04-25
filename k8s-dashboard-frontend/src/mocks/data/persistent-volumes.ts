import type { PersistentVolume } from "@/entities/persistent-volume";

export const MOCK_PERSISTENT_VOLUMES: PersistentVolume[] = [
  { name: "postgres-pv-0",       status: "Bound",     capacity: "20Gi",  accessModes: ["ReadWriteOnce"], reclaimPolicy: "Retain", storageClass: "standard", claim: "database/postgres-primary-pvc", age: "30d" },
  { name: "redis-pv-0",          status: "Bound",     capacity: "5Gi",   accessModes: ["ReadWriteOnce"], reclaimPolicy: "Delete", storageClass: "standard", claim: "cache/redis-pvc",               age: "21d" },
  { name: "elasticsearch-pv-0",  status: "Bound",     capacity: "50Gi",  accessModes: ["ReadWriteOnce"], reclaimPolicy: "Retain", storageClass: "fast-ssd", claim: "monitoring/elasticsearch-pvc-0",age: "5d"  },
  { name: "elasticsearch-pv-1",  status: "Available", capacity: "50Gi",  accessModes: ["ReadWriteOnce"], reclaimPolicy: "Retain", storageClass: "fast-ssd", claim: null,                            age: "5d"  },
  { name: "kafka-pv-0",          status: "Bound",     capacity: "100Gi", accessModes: ["ReadWriteOnce"], reclaimPolicy: "Retain", storageClass: "fast-ssd", claim: "production/kafka-pvc-0",        age: "12d" },
  { name: "backup-pv",           status: "Released",  capacity: "100Gi", accessModes: ["ReadWriteMany"], reclaimPolicy: "Retain", storageClass: "standard", claim: null,                            age: "14d" },
  { name: "orphan-pv",           status: "Failed",    capacity: "10Gi",  accessModes: ["ReadWriteOnce"], reclaimPolicy: "Delete", storageClass: "standard", claim: null,                            age: "2h"  },
];
