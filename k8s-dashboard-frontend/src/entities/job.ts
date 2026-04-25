export type JobStatus = "Complete" | "Running" | "Failed" | "Suspended";

export interface Job {
  name: string;
  namespace: string;
  status: JobStatus;
  completions: number;
  desired: number;
  duration: string | null;
  age: string;
}
