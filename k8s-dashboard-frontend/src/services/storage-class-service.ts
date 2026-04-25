import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_STORAGE_CLASSES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { StorageClass } from "@/entities/storage-class";

export async function getStorageClasses(clusterId: string): Promise<StorageClass[]> {
  if (USE_MOCK_DATA) return MOCK_STORAGE_CLASSES;
  const { data } = await apiClient.get<StorageClass[]>(`/clusters/${clusterId}/storageclasses`);
  return data;
}
