import type { Cluster } from "@/entities/cluster";

export const MOCK_CLUSTERS: Cluster[] = [
  {
    id: "prod-eu",
    name: "production-eu-west-1",
    status: "healthy",
    nodeCount: 12,
    podCount: 184,
    namespaceCount: 8,
    version: "v1.28.3",
    createdAt: "2024-03-15",
  },
  {
    id: "staging",
    name: "staging-cluster",
    status: "warning",
    nodeCount: 4,
    podCount: 47,
    namespaceCount: 5,
    version: "v1.28.1",
    createdAt: "2024-05-22",
  },
  {
    id: "dev-local",
    name: "dev-local-minikube",
    status: "healthy",
    nodeCount: 1,
    podCount: 23,
    namespaceCount: 3,
    version: "v1.29.0",
    createdAt: "2024-08-10",
  },
];
