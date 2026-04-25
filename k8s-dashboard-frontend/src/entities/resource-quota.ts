export interface ResourceQuotaItem {
  resource: string;
  used: string;
  hard: string;
  usedRaw: number;
  hardRaw: number;
}

export interface ResourceQuota {
  name: string;
  namespace: string;
  items: ResourceQuotaItem[];
  age: string;
}
