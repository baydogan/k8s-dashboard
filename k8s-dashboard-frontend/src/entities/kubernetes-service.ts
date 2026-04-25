export type ServiceType = "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";

export interface KubernetesService {
  name: string;
  namespace: string;
  type: ServiceType;
  clusterIP: string;
  externalIP: string | null;
  ports: string[];
  age: string;
}
