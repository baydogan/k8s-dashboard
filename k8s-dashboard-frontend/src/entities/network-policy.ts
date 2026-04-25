export type PolicyType = "Ingress" | "Egress";

export interface NetworkPolicy {
  name: string;
  namespace: string;
  podSelector: string;
  policyTypes: PolicyType[];
  ingressRules: number;
  egressRules: number;
  age: string;
}
