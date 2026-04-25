export type HPAStatus = "AtTarget" | "ScalingUp" | "ScalingDown" | "Unknown";

export interface HorizontalPodAutoscaler {
  name: string;
  namespace: string;
  targetKind: string;
  targetName: string;
  minReplicas: number;
  maxReplicas: number;
  currentReplicas: number;
  desiredReplicas: number;
  currentMetric: string;
  age: string;
}
