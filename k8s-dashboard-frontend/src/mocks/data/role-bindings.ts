import type { RoleBinding } from "@/entities/role-binding";

export const MOCK_ROLE_BINDINGS: RoleBinding[] = [
  { name: "app-reader-binding",        namespace: "default",       roleRef: "app-reader",              roleKind: "Role",        subjects: 2, age: "45d"  },
  { name: "app-writer-binding",        namespace: "default",       roleRef: "app-writer",              roleKind: "Role",        subjects: 1, age: "45d"  },
  { name: "pod-reader-binding",        namespace: "default",       roleRef: "pod-reader",              roleKind: "Role",        subjects: 3, age: "30d"  },
  { name: "prometheus-binding",        namespace: "monitoring",    roleRef: "prometheus-role",         roleKind: "Role",        subjects: 1, age: "60d"  },
  { name: "grafana-binding",           namespace: "monitoring",    roleRef: "grafana-role",            roleKind: "Role",        subjects: 1, age: "60d"  },
  { name: "fluentd-binding",           namespace: "logging",       roleRef: "fluentd-role",            roleKind: "Role",        subjects: 1, age: "55d"  },
  { name: "cert-manager-binding",      namespace: "cert-manager",  roleRef: "cert-manager-controller", roleKind: "Role",        subjects: 1, age: "90d"  },
  { name: "nginx-binding",             namespace: "ingress-nginx", roleRef: "nginx-ingress-role",      roleKind: "Role",        subjects: 1, age: "40d"  },
  { name: "deployer-binding",          namespace: "production",    roleRef: "production-deployer",     roleKind: "Role",        subjects: 2, age: "20d"  },
  { name: "read-secrets-binding",      namespace: "production",    roleRef: "read-secrets",            roleKind: "Role",        subjects: 1, age: "15d"  },
  { name: "view-binding",              namespace: "production",    roleRef: "view",                    roleKind: "ClusterRole", subjects: 4, age: "12d"  },
  { name: "configmap-binding",         namespace: "production",    roleRef: "configmap-updater",       roleKind: "Role",        subjects: 1, age: "10d"  },
  { name: "edit-binding",              namespace: "staging",       roleRef: "edit",                    roleKind: "ClusterRole", subjects: 3, age: "25d"  },
  { name: "leader-election-binding",   namespace: "kube-system",   roleRef: "leader-election",         roleKind: "Role",        subjects: 2, age: "120d" },
];
