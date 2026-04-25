import type { ResourceQuota } from "@/entities/resource-quota";

export const MOCK_RESOURCE_QUOTAS: ResourceQuota[] = [
  {
    name: "production-quota", namespace: "production", age: "45d",
    items: [
      { resource: "pods",           used: "24",   hard: "50",   usedRaw: 24,   hardRaw: 50   },
      { resource: "cpu",            used: "2",    hard: "10",   usedRaw: 2,    hardRaw: 10   },
      { resource: "memory",        used: "4Gi",  hard: "20Gi", usedRaw: 4,    hardRaw: 20   },
      { resource: "services",       used: "6",    hard: "20",   usedRaw: 6,    hardRaw: 20   },
    ],
  },
  {
    name: "database-quota", namespace: "database", age: "30d",
    items: [
      { resource: "pods",    used: "3",    hard: "10",  usedRaw: 3,   hardRaw: 10  },
      { resource: "cpu",     used: "0.5",  hard: "4",   usedRaw: 0.5, hardRaw: 4   },
      { resource: "memory", used: "2Gi",  hard: "8Gi", usedRaw: 2,   hardRaw: 8   },
    ],
  },
  {
    name: "monitoring-quota", namespace: "monitoring", age: "28d",
    items: [
      { resource: "pods",    used: "7",    hard: "20",   usedRaw: 7,   hardRaw: 20  },
      { resource: "cpu",     used: "1",    hard: "5",    usedRaw: 1,   hardRaw: 5   },
      { resource: "memory", used: "3Gi",  hard: "10Gi", usedRaw: 3,   hardRaw: 10  },
    ],
  },
];
