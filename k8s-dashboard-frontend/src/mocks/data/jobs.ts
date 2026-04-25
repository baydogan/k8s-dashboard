import type { Job } from "@/entities/job";

export const MOCK_JOBS: Job[] = [
  { name: "db-backup-1714900000",     namespace: "database",    status: "Complete",  completions: 1, desired: 1, duration: "2m30s", age: "6h"  },
  { name: "db-migration-v2",          namespace: "production",  status: "Complete",  completions: 1, desired: 1, duration: "45s",   age: "2d"  },
  { name: "report-generator-morning", namespace: "default",     status: "Running",   completions: 0, desired: 1, duration: null,    age: "12m" },
  { name: "cleanup-old-data",         namespace: "default",     status: "Failed",    completions: 0, desired: 3, duration: "5m",    age: "1h"  },
  { name: "seed-staging-db",          namespace: "staging",     status: "Complete",  completions: 1, desired: 1, duration: "1m12s", age: "3d"  },
  { name: "index-rebuild",            namespace: "database",    status: "Suspended", completions: 0, desired: 1, duration: null,    age: "4h"  },
];
