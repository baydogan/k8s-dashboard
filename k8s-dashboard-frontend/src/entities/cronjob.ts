export type CronJobStatus = "Active" | "Suspended";

export interface CronJob {
  name: string;
  namespace: string;
  schedule: string;
  status: CronJobStatus;
  lastSchedule: string | null;
  lastSuccessful: string | null;
  activeJobs: number;
  age: string;
}
