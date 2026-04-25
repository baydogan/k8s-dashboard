import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_PERSISTENT_VOLUME_CLAIMS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { PersistentVolumeClaim } from "@/entities/persistent-volume-claim";

export async function getPersistentVolumeClaims(clusterId: string): Promise<PersistentVolumeClaim[]> {
  if (USE_MOCK_DATA) return MOCK_PERSISTENT_VOLUME_CLAIMS;
  const { data } = await apiClient.get<PersistentVolumeClaim[]>(`/clusters/${clusterId}/persistentvolumeclaims`);
  return data;
}
