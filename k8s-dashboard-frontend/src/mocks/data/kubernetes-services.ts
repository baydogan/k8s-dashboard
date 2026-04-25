import type { KubernetesService } from "@/entities/kubernetes-service";

export const MOCK_KUBERNETES_SERVICES: KubernetesService[] = [
  { name: "api-gateway",    namespace: "production",  type: "LoadBalancer", clusterIP: "10.96.1.10", externalIP: "203.0.113.42",  ports: ["80/TCP", "443/TCP"],  age: "14d" },
  { name: "frontend",       namespace: "production",  type: "ClusterIP",    clusterIP: "10.96.1.11", externalIP: null,            ports: ["80/TCP"],             age: "6d"  },
  { name: "auth-service",   namespace: "production",  type: "ClusterIP",    clusterIP: "10.96.1.15", externalIP: null,            ports: ["8080/TCP"],           age: "9d"  },
  { name: "postgres",       namespace: "database",    type: "ClusterIP",    clusterIP: "10.96.2.1",  externalIP: null,            ports: ["5432/TCP"],           age: "30d" },
  { name: "redis",          namespace: "cache",       type: "ClusterIP",    clusterIP: "10.96.3.1",  externalIP: null,            ports: ["6379/TCP"],           age: "21d" },
  { name: "metrics-server", namespace: "monitoring",  type: "NodePort",     clusterIP: "10.96.4.1",  externalIP: null,            ports: ["8080:30080/TCP"],     age: "28d" },
  { name: "grafana",        namespace: "monitoring",  type: "LoadBalancer", clusterIP: "10.96.4.5",  externalIP: "10.0.0.5",      ports: ["3000/TCP"],           age: "28d" },
  { name: "kubernetes",     namespace: "default",     type: "ClusterIP",    clusterIP: "10.96.0.1",  externalIP: null,            ports: ["443/TCP"],            age: "60d" },
];
