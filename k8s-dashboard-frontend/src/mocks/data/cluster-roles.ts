import type { ClusterRole } from "@/entities/cluster-role";

export const MOCK_CLUSTER_ROLES: ClusterRole[] = [
  { name: "cluster-admin",                                 rules: 1,  builtin: true,  age: "120d" },
  { name: "admin",                                         rules: 8,  builtin: true,  age: "120d" },
  { name: "edit",                                          rules: 7,  builtin: true,  age: "120d" },
  { name: "view",                                          rules: 4,  builtin: true,  age: "120d" },
  { name: "system:node",                                   rules: 6,  builtin: true,  age: "120d" },
  { name: "system:node-proxier",                           rules: 3,  builtin: true,  age: "120d" },
  { name: "system:kube-scheduler",                         rules: 5,  builtin: true,  age: "120d" },
  { name: "system:kube-controller-manager",                rules: 12, builtin: true,  age: "120d" },
  { name: "system:persistent-volume-provisioner",          rules: 4,  builtin: true,  age: "120d" },
  { name: "system:metrics-server",                         rules: 3,  builtin: true,  age: "120d" },
  { name: "system:coredns",                                rules: 2,  builtin: true,  age: "120d" },
  { name: "prometheus-cluster-role",                       rules: 5,  builtin: false, age: "60d"  },
  { name: "cert-manager-cluster-role",                     rules: 8,  builtin: false, age: "90d"  },
  { name: "nginx-ingress-clusterrole",                     rules: 6,  builtin: false, age: "40d"  },
  { name: "flux-cluster-role",                             rules: 10, builtin: false, age: "35d"  },
  { name: "external-secrets-cluster-role",                 rules: 4,  builtin: false, age: "28d"  },
  { name: "read-only-cluster-role",                        rules: 3,  builtin: false, age: "15d"  },
];
