export interface PodDisruptionBudget {
  name: string;
  namespace: string;
  minAvailable: string | null;
  maxUnavailable: string | null;
  currentHealthy: number;
  desiredHealthy: number;
  disruptionsAllowed: number;
  age: string;
}
