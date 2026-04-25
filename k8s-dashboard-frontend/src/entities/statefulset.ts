export type StatefulSetStatus = "Running" | "Degraded" | "Failed" | "Updating";

export interface StatefulSet {
  name: string;
  namespace: string;
  status: StatefulSetStatus;
  readyReplicas: number;
  desiredReplicas: number;
  serviceName: string;
  storageClass?: string;
  age: string;
}
