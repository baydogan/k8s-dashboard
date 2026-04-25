import type { StorageClass } from "@/entities/storage-class";

export const MOCK_STORAGE_CLASSES: StorageClass[] = [
  { name: "standard",    provisioner: "kubernetes.io/gce-pd",             reclaimPolicy: "Delete", volumeBindingMode: "Immediate",           allowVolumeExpansion: true,  isDefault: true,  age: "60d" },
  { name: "fast-ssd",    provisioner: "kubernetes.io/gce-pd",             reclaimPolicy: "Retain", volumeBindingMode: "WaitForFirstConsumer", allowVolumeExpansion: true,  isDefault: false, age: "45d" },
  { name: "nfs-client",  provisioner: "cluster.local/nfs-provisioner",    reclaimPolicy: "Delete", volumeBindingMode: "Immediate",           allowVolumeExpansion: false, isDefault: false, age: "30d" },
  { name: "local-path",  provisioner: "rancher.io/local-path",            reclaimPolicy: "Delete", volumeBindingMode: "WaitForFirstConsumer", allowVolumeExpansion: false, isDefault: false, age: "60d" },
];
