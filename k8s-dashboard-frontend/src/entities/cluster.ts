export interface Cluster {
  id: string;
  name: string;
  status: "healthy" | "warning" | "critical" | "unknown";
  nodeCount: number;
  podCount: number;
  namespaceCount: number;
  version?: string;
  createdAt: string;
}
