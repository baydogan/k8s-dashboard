export interface HTTPRoute {
  name: string;
  namespace: string;
  parentRefs: string[];
  hostnames: string[];
  rules: number;
  age: string;
}
