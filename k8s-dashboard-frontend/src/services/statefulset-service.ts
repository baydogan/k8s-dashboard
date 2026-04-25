import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_STATEFULSETS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { StatefulSet } from "@/entities/statefulset";

export async function getStatefulSets(clusterId: string): Promise<StatefulSet[]> {
  if (USE_MOCK_DATA) return MOCK_STATEFULSETS;
  const { data } = await apiClient.get<StatefulSet[]>(`/clusters/${clusterId}/statefulsets`);
  return data;
}
