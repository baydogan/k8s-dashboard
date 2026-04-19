export interface K8sNode {
  name: string;
  status: "Ready" | "NotReady" | "SchedulingDisabled";
  roles: string[];
  version: string;
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  podCount: number;
  age: string;
  internalIP?: string;
  os?: string;
}
