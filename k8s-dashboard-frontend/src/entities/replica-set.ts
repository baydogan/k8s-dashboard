export type ReplicaSetStatus = "Available" | "Degraded" | "Unavailable" | "Idle";

export interface ReplicaSet {
  name: string;
  namespace: string;
  status: ReplicaSetStatus;
  desiredReplicas: number;
  readyReplicas: number;
  availableReplicas: number;
  ownerDeployment?: string;
  images: string[];
  age: string;
}
