export type LimitType = "Container" | "Pod" | "PersistentVolumeClaim";

export interface LimitRangeItem {
  type: LimitType;
  resource: string;
  min?: string;
  max?: string;
  default?: string;
  defaultRequest?: string;
}

export interface LimitRange {
  name: string;
  namespace: string;
  limits: LimitRangeItem[];
  age: string;
}
