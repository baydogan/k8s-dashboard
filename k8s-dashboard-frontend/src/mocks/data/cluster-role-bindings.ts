import type { ClusterRoleBinding } from "@/entities/cluster-role-binding";

export const MOCK_CLUSTER_ROLE_BINDINGS: ClusterRoleBinding[] = [
  { name: "cluster-admin",                       roleRef: "cluster-admin",                      subjects: 1, builtin: true,  age: "120d" },
  { name: "system:node",                         roleRef: "system:node",                        subjects: 3, builtin: true,  age: "120d" },
  { name: "system:node-proxier",                 roleRef: "system:node-proxier",                subjects: 1, builtin: true,  age: "120d" },
  { name: "system:kube-scheduler",               roleRef: "system:kube-scheduler",              subjects: 1, builtin: true,  age: "120d" },
  { name: "system:kube-controller-manager",      roleRef: "system:kube-controller-manager",     subjects: 1, builtin: true,  age: "120d" },
  { name: "system:coredns",                      roleRef: "system:coredns",                     subjects: 1, builtin: true,  age: "120d" },
  { name: "system:metrics-server",               roleRef: "system:metrics-server",              subjects: 1, builtin: true,  age: "120d" },
  { name: "prometheus-cluster-binding",          roleRef: "prometheus-cluster-role",            subjects: 1, builtin: false, age: "60d"  },
  { name: "cert-manager-cluster-binding",        roleRef: "cert-manager-cluster-role",          subjects: 1, builtin: false, age: "90d"  },
  { name: "nginx-ingress-clusterrolebinding",    roleRef: "nginx-ingress-clusterrole",          subjects: 1, builtin: false, age: "40d"  },
  { name: "flux-cluster-binding",                roleRef: "flux-cluster-role",                  subjects: 2, builtin: false, age: "35d"  },
  { name: "external-secrets-binding",            roleRef: "external-secrets-cluster-role",      subjects: 1, builtin: false, age: "28d"  },
  { name: "read-only-cluster-binding",           roleRef: "read-only-cluster-role",             subjects: 5, builtin: false, age: "15d"  },
];
