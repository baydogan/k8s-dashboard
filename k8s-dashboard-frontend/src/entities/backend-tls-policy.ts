export interface BackendTLSPolicy {
  name: string;
  namespace: string;
  targetService: string;
  targetPort: number;
  caCertRef: string;
  age: string;
}
