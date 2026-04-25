import type { Role } from "@/entities/role";

export const MOCK_ROLES: Role[] = [
  { name: "app-reader",              namespace: "default",       rules: 3,  age: "45d"  },
  { name: "app-writer",              namespace: "default",       rules: 6,  age: "45d"  },
  { name: "pod-reader",              namespace: "default",       rules: 1,  age: "30d"  },
  { name: "prometheus-role",         namespace: "monitoring",    rules: 4,  age: "60d"  },
  { name: "grafana-role",            namespace: "monitoring",    rules: 2,  age: "60d"  },
  { name: "fluentd-role",            namespace: "logging",       rules: 3,  age: "55d"  },
  { name: "cert-manager-controller", namespace: "cert-manager",  rules: 12, age: "90d"  },
  { name: "nginx-ingress-role",      namespace: "ingress-nginx", rules: 5,  age: "40d"  },
  { name: "leader-election",         namespace: "kube-system",   rules: 3,  age: "120d" },
  { name: "extension-apiserver-role",namespace: "kube-system",   rules: 2,  age: "120d" },
  { name: "oauth2-proxy-role",       namespace: "auth",          rules: 2,  age: "35d"  },
  { name: "production-deployer",     namespace: "production",    rules: 8,  age: "20d"  },
  { name: "read-secrets",            namespace: "production",    rules: 1,  age: "15d"  },
  { name: "configmap-updater",       namespace: "production",    rules: 2,  age: "10d"  },
];
