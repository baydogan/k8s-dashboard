export type DeploymentStatus =
  | "Available"
  | "Progressing"
  | "Failed"
  | "Paused"
  | "ScaledDown";

export interface Deployment {
  name: string;
  namespace: string;
  status: DeploymentStatus;
  desiredReplicas: number;
  readyReplicas: number;
  upToDateReplicas: number;
  availableReplicas: number;
  images: string[];
  age: string;
}
