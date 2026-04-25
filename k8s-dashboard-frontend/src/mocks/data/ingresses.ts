import type { KubernetesIngress } from "@/entities/ingress";

export const MOCK_INGRESSES: KubernetesIngress[] = [
  { name: "api-gateway-ingress", namespace: "production", ingressClass: "nginx", hosts: ["api.example.com"],             address: "203.0.113.42", tls: true,  age: "14d" },
  { name: "frontend-ingress",    namespace: "production", ingressClass: "nginx", hosts: ["app.example.com"],             address: "203.0.113.42", tls: true,  age: "6d"  },
  { name: "grafana-ingress",     namespace: "monitoring", ingressClass: "nginx", hosts: ["grafana.internal.example.com"],address: "10.0.0.5",     tls: false, age: "28d" },
  { name: "auth-ingress",        namespace: "production", ingressClass: "nginx", hosts: ["auth.example.com"],            address: "203.0.113.42", tls: true,  age: "9d"  },
  { name: "staging-ingress",     namespace: "staging",    ingressClass: "nginx", hosts: ["staging.example.com", "staging-api.example.com"], address: null, tls: false, age: "5d" },
];
