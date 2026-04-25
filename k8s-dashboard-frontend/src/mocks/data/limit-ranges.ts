import type { LimitRange } from "@/entities/limit-range";

export const MOCK_LIMIT_RANGES: LimitRange[] = [
  {
    name: "default-limits",
    namespace: "default",
    age: "120d",
    limits: [
      { type: "Container", resource: "cpu",    min: "50m",  max: "2",    default: "500m", defaultRequest: "100m" },
      { type: "Container", resource: "memory", min: "64Mi", max: "2Gi",  default: "512Mi",defaultRequest: "128Mi" },
    ],
  },
  {
    name: "production-limits",
    namespace: "production",
    age: "60d",
    limits: [
      { type: "Container", resource: "cpu",    min: "100m", max: "4",    default: "1",    defaultRequest: "250m" },
      { type: "Container", resource: "memory", min: "128Mi",max: "4Gi",  default: "1Gi",  defaultRequest: "256Mi" },
      { type: "Pod",       resource: "cpu",    min: "200m", max: "8"                                              },
      { type: "Pod",       resource: "memory", min: "256Mi",max: "8Gi"                                            },
    ],
  },
  {
    name: "monitoring-limits",
    namespace: "monitoring",
    age: "60d",
    limits: [
      { type: "Container", resource: "cpu",    min: "50m",  max: "4",    default: "1",    defaultRequest: "200m" },
      { type: "Container", resource: "memory", min: "64Mi", max: "8Gi",  default: "2Gi",  defaultRequest: "512Mi" },
    ],
  },
  {
    name: "logging-limits",
    namespace: "logging",
    age: "55d",
    limits: [
      { type: "Container", resource: "cpu",    min: "50m",  max: "2",    default: "500m", defaultRequest: "100m" },
      { type: "Container", resource: "memory", min: "64Mi", max: "4Gi",  default: "1Gi",  defaultRequest: "256Mi" },
    ],
  },
  {
    name: "pvc-limits",
    namespace: "production",
    age: "45d",
    limits: [
      { type: "PersistentVolumeClaim", resource: "storage", min: "1Gi", max: "100Gi" },
    ],
  },
];
