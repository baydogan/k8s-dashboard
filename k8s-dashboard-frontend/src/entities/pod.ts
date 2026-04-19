export type PodStatus =
  | "Running"
  | "Pending"
  | "Succeeded"
  | "Failed"
  | "Unknown"
  | "CrashLoopBackOff"
  | "Terminating";

export interface Pod {
  name: string;
  namespace: string;
  status: PodStatus;
  nodeName: string;
  restartCount: number;
  ready: string; // e.g. "2/2"
  age: string;
  ip?: string;
  containers: string[];
}
