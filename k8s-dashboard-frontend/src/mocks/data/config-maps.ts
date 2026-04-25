import type { ConfigMap } from "@/entities/config-map";

export const MOCK_CONFIG_MAPS: ConfigMap[] = [
  { name: "app-config",         namespace: "default",    dataKeys: ["DATABASE_URL", "REDIS_URL", "LOG_LEVEL", "MAX_CONNECTIONS"], age: "45d" },
  { name: "nginx-config",       namespace: "default",    dataKeys: ["nginx.conf", "default.conf"],                               age: "30d" },
  { name: "prometheus-config",  namespace: "monitoring", dataKeys: ["prometheus.yml", "alert.rules", "recording.rules"],         age: "60d" },
  { name: "grafana-dashboards", namespace: "monitoring", dataKeys: ["k8s-overview.json", "api-server.json"],                     age: "60d" },
  { name: "grafana-datasources",namespace: "monitoring", dataKeys: ["datasources.yaml"],                                         age: "60d" },
  { name: "fluentd-config",     namespace: "logging",    dataKeys: ["fluent.conf", "kubernetes.conf", "systemd.conf"],           age: "55d" },
  { name: "coredns",            namespace: "kube-system",dataKeys: ["Corefile"],                                                 age: "120d" },
  { name: "kube-proxy",         namespace: "kube-system",dataKeys: ["config.conf", "kubeconfig.conf"],                          age: "120d" },
  { name: "aws-auth",           namespace: "kube-system",dataKeys: ["mapRoles", "mapUsers"],                                    age: "120d" },
  { name: "extension-apiserver-authentication", namespace: "kube-system", dataKeys: ["client-ca-file", "requestheader-allowed-names", "requestheader-client-ca-file"], age: "120d" },
  { name: "api-gateway-config", namespace: "ingress-nginx", dataKeys: ["proxy-connect-timeout", "proxy-read-timeout", "use-gzip", "enable-brotli"], age: "40d" },
  { name: "feature-flags",      namespace: "production", dataKeys: ["NEW_CHECKOUT", "DARK_MODE", "BETA_API", "AB_TEST_GROUPS"], age: "10d" },
  { name: "oauth2-proxy-config",namespace: "auth",       dataKeys: ["oauth2_proxy.cfg"],                                        age: "35d" },
  { name: "cert-manager-config",namespace: "cert-manager",dataKeys: ["config.yaml"],                                            age: "90d" },
];
