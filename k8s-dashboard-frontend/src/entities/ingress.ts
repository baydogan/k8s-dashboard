export interface KubernetesIngress {
  name: string;
  namespace: string;
  ingressClass: string;
  hosts: string[];
  address: string | null;
  tls: boolean;
  age: string;
}
