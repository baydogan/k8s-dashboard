import type { Secret } from "@/entities/secret";

export const MOCK_SECRETS: Secret[] = [
  { name: "app-db-credentials",      namespace: "default",      type: "Opaque",                                   dataCount: 3, age: "45d" },
  { name: "app-api-keys",            namespace: "default",      type: "Opaque",                                   dataCount: 5, age: "30d" },
  { name: "default-token-x7f9k",     namespace: "default",      type: "kubernetes.io/service-account-token",      dataCount: 3, age: "120d" },
  { name: "regcred",                 namespace: "default",      type: "kubernetes.io/dockerconfigjson",            dataCount: 1, age: "60d" },
  { name: "tls-cert",                namespace: "ingress-nginx", type: "kubernetes.io/tls",                        dataCount: 2, age: "14d" },
  { name: "grafana-admin-secret",    namespace: "monitoring",   type: "Opaque",                                   dataCount: 2, age: "60d" },
  { name: "prometheus-token-m2pqr", namespace: "monitoring",   type: "kubernetes.io/service-account-token",       dataCount: 3, age: "60d" },
  { name: "fluentd-es-credentials",  namespace: "logging",      type: "Opaque",                                   dataCount: 2, age: "55d" },
  { name: "oauth2-proxy-cookie",     namespace: "auth",         type: "Opaque",                                   dataCount: 1, age: "35d" },
  { name: "github-registry",         namespace: "production",   type: "kubernetes.io/dockerconfigjson",            dataCount: 1, age: "20d" },
  { name: "stripe-api-secret",       namespace: "production",   type: "Opaque",                                   dataCount: 2, age: "15d" },
  { name: "bootstrap-token-abcdef",  namespace: "kube-system",  type: "bootstrap.kubernetes.io/token",            dataCount: 6, age: "120d" },
  { name: "aws-ecr-credentials",    namespace: "production",   type: "kubernetes.io/dockerconfigjson",            dataCount: 1, age: "7d"  },
  { name: "smtp-credentials",        namespace: "default",      type: "Opaque",                                   dataCount: 4, age: "40d" },
  { name: "wildcard-tls",            namespace: "cert-manager", type: "kubernetes.io/tls",                        dataCount: 2, age: "14d" },
];
