import type { NetworkPolicy } from "@/entities/network-policy";

export const MOCK_NETWORK_POLICIES: NetworkPolicy[] = [
  { name: "default-deny-all",        namespace: "production",    podSelector: "<all pods>",          policyTypes: ["Ingress", "Egress"], ingressRules: 0, egressRules: 0,  age: "60d" },
  { name: "allow-frontend-to-api",   namespace: "production",    podSelector: "app=api",             policyTypes: ["Ingress"],           ingressRules: 1, egressRules: 0,  age: "45d" },
  { name: "allow-api-to-db",         namespace: "production",    podSelector: "app=postgres",        policyTypes: ["Ingress"],           ingressRules: 1, egressRules: 0,  age: "45d" },
  { name: "allow-egress-dns",        namespace: "production",    podSelector: "<all pods>",          policyTypes: ["Egress"],            ingressRules: 0, egressRules: 1,  age: "45d" },
  { name: "allow-monitoring",        namespace: "production",    podSelector: "<all pods>",          policyTypes: ["Ingress"],           ingressRules: 1, egressRules: 0,  age: "40d" },
  { name: "deny-external-ingress",   namespace: "default",       podSelector: "tier=backend",        policyTypes: ["Ingress"],           ingressRules: 1, egressRules: 0,  age: "30d" },
  { name: "allow-prometheus-scrape", namespace: "monitoring",    podSelector: "<all pods>",          policyTypes: ["Ingress"],           ingressRules: 1, egressRules: 0,  age: "60d" },
  { name: "logging-egress-es",       namespace: "logging",       podSelector: "app=fluentd",         policyTypes: ["Egress"],            ingressRules: 0, egressRules: 2,  age: "55d" },
  { name: "ingress-allow-http",      namespace: "ingress-nginx", podSelector: "app.kubernetes.io/name=ingress-nginx", policyTypes: ["Ingress", "Egress"], ingressRules: 2, egressRules: 1, age: "40d" },
  { name: "isolate-auth-namespace",  namespace: "auth",          podSelector: "<all pods>",          policyTypes: ["Ingress", "Egress"], ingressRules: 2, egressRules: 2,  age: "35d" },
];
