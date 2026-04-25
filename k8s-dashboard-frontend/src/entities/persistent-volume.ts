export type PVStatus = "Available" | "Bound" | "Released" | "Failed";
export type ReclaimPolicy = "Retain" | "Delete" | "Recycle";

export interface PersistentVolume {
  name: string;
  status: PVStatus;
  capacity: string;
  accessModes: string[];
  reclaimPolicy: ReclaimPolicy;
  storageClass: string;
  claim: string | null;
  age: string;
}
