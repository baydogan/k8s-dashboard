export type VolumeBindingMode = "Immediate" | "WaitForFirstConsumer";
export type StorageReclaimPolicy = "Retain" | "Delete";

export interface StorageClass {
  name: string;
  provisioner: string;
  reclaimPolicy: StorageReclaimPolicy;
  volumeBindingMode: VolumeBindingMode;
  allowVolumeExpansion: boolean;
  isDefault: boolean;
  age: string;
}
