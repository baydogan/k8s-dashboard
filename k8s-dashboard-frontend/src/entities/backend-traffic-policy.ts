export type LBAlgorithm = "RoundRobin" | "LeastRequest" | "Random" | "ConsistentHash";

export interface BackendTrafficPolicy {
  name: string;
  namespace: string;
  targetService: string;
  loadBalancer: LBAlgorithm;
  age: string;
}
