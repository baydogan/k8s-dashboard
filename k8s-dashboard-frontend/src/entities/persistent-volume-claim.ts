export type PVCStatus = "Bound" | "Pending" | "Lost";

export interface PersistentVolumeClaim {
  name: string;
  namespace: string;
  status: PVCStatus;
  volume: string | null;
  capacity: string | null;
  accessModes: string[];
  storageClass: string;
  age: string;
}
