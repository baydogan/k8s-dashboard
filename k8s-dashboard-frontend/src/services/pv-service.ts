import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_PERSISTENT_VOLUMES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { PersistentVolume } from "@/entities/persistent-volume";

export async function getPersistentVolumes(clusterId: string): Promise<PersistentVolume[]> {
  if (USE_MOCK_DATA) return MOCK_PERSISTENT_VOLUMES;
  const { data } = await apiClient.get<PersistentVolume[]>(`/clusters/${clusterId}/persistentvolumes`);
  return data;
}
