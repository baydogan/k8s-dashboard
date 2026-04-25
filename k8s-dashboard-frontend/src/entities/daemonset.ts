export type DaemonSetStatus = "Available" | "Degraded" | "Progressing";

export interface DaemonSet {
  name: string;
  namespace: string;
  status: DaemonSetStatus;
  desired: number;
  current: number;
  ready: number;
  available: number;
  upToDate: number;
  age: string;
}
