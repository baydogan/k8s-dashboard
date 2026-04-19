import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_PODS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { Pod } from "@/entities/pod";

export async function getPods(clusterId: string): Promise<Pod[]> {
  if (USE_MOCK_DATA) {
    return MOCK_PODS;
  }
  const { data } = await apiClient.get<Pod[]>(`/clusters/${clusterId}/pods`);
  return data;
}
