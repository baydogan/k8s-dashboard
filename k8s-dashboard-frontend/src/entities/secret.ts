export type SecretType =
  | "Opaque"
  | "kubernetes.io/service-account-token"
  | "kubernetes.io/dockerconfigjson"
  | "kubernetes.io/tls"
  | "bootstrap.kubernetes.io/token";

export interface Secret {
  name: string;
  namespace: string;
  type: SecretType;
  dataCount: number;
  age: string;
}
