export type NamespaceStatus = "Active" | "Terminating";

export interface Namespace {
  name: string;
  status: NamespaceStatus;
  podCount: number;
  deploymentCount: number;
  serviceCount: number;
  age: string;
  labels: Record<string, string>;
}
