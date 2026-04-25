import type { ServiceAccount } from "@/entities/service-account";

export const MOCK_SERVICE_ACCOUNTS: ServiceAccount[] = [
  { name: "default",              namespace: "default",       secrets: 1, age: "120d" },
  { name: "app-service-account",  namespace: "default",       secrets: 2, age: "45d"  },
  { name: "prometheus",           namespace: "monitoring",    secrets: 1, age: "60d"  },
  { name: "grafana",              namespace: "monitoring",    secrets: 1, age: "60d"  },
  { name: "default",              namespace: "monitoring",    secrets: 1, age: "120d" },
  { name: "fluentd",              namespace: "logging",       secrets: 1, age: "55d"  },
  { name: "default",              namespace: "logging",       secrets: 1, age: "120d" },
  { name: "coredns",              namespace: "kube-system",   secrets: 1, age: "120d" },
  { name: "kube-proxy",           namespace: "kube-system",   secrets: 1, age: "120d" },
  { name: "node-problem-detector",namespace: "kube-system",   secrets: 1, age: "120d" },
  { name: "cert-manager",         namespace: "cert-manager",  secrets: 1, age: "90d"  },
  { name: "nginx-ingress",        namespace: "ingress-nginx", secrets: 1, age: "40d"  },
  { name: "oauth2-proxy",         namespace: "auth",          secrets: 1, age: "35d"  },
  { name: "default",              namespace: "production",    secrets: 1, age: "120d" },
  { name: "worker",               namespace: "production",    secrets: 2, age: "20d"  },
];
