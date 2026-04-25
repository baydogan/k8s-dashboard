import type { PodDisruptionBudget } from "@/entities/pdb";

export const MOCK_PDBS: PodDisruptionBudget[] = [
  { name: "api-gateway-pdb", namespace: "production", minAvailable: "2",   maxUnavailable: null, currentHealthy: 3, desiredHealthy: 2, disruptionsAllowed: 1, age: "14d" },
  { name: "frontend-pdb",    namespace: "production", minAvailable: null,  maxUnavailable: "1",  currentHealthy: 2, desiredHealthy: 1, disruptionsAllowed: 1, age: "6d"  },
  { name: "postgres-pdb",    namespace: "database",   minAvailable: "1",   maxUnavailable: null, currentHealthy: 1, desiredHealthy: 1, disruptionsAllowed: 0, age: "30d" },
  { name: "redis-pdb",       namespace: "cache",      minAvailable: "2",   maxUnavailable: null, currentHealthy: 3, desiredHealthy: 2, disruptionsAllowed: 1, age: "21d" },
  { name: "kafka-pdb",       namespace: "production", minAvailable: "50%", maxUnavailable: null, currentHealthy: 2, desiredHealthy: 2, disruptionsAllowed: 0, age: "12d" },
];
