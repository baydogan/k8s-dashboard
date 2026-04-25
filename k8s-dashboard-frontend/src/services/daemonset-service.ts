import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_DAEMONSETS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { DaemonSet } from "@/entities/daemonset";

export async function getDaemonSets(clusterId: string): Promise<DaemonSet[]> {
  if (USE_MOCK_DATA) return MOCK_DAEMONSETS;
  const { data } = await apiClient.get<DaemonSet[]>(`/clusters/${clusterId}/daemonsets`);
  return data;
}
