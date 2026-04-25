import type { CronJob } from "@/entities/cronjob";

export const MOCK_CRONJOBS: CronJob[] = [
  { name: "backup-daily",     namespace: "database",    schedule: "0 2 * * *",   status: "Active",    lastSchedule: "22h",  lastSuccessful: "22h",  activeJobs: 0, age: "45d" },
  { name: "cleanup-weekly",   namespace: "default",     schedule: "0 0 * * 0",   status: "Active",    lastSchedule: "6d",   lastSuccessful: "6d",   activeJobs: 0, age: "30d" },
  { name: "health-check",     namespace: "monitoring",  schedule: "*/5 * * * *", status: "Active",    lastSchedule: "4m",   lastSuccessful: "4m",   activeJobs: 1, age: "7d"  },
  { name: "report-hourly",    namespace: "production",  schedule: "0 * * * *",   status: "Suspended", lastSchedule: "3h",   lastSuccessful: "3h",   activeJobs: 0, age: "14d" },
  { name: "cert-renewal",     namespace: "kube-system", schedule: "0 0 1 * *",   status: "Active",    lastSchedule: "24d",  lastSuccessful: "24d",  activeJobs: 0, age: "60d" },
  { name: "log-rotation",     namespace: "logging",     schedule: "0 3 * * *",   status: "Suspended", lastSchedule: null,   lastSuccessful: null,   activeJobs: 0, age: "5d"  },
];
