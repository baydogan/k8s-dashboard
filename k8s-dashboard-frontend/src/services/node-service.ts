import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_NODES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { K8sNode } from "@/entities/node";

export async function getNodes(clusterId: string): Promise<K8sNode[]> {
  if (USE_MOCK_DATA) {
    return MOCK_NODES;
  }
  const { data } = await apiClient.get<K8sNode[]>(`/clusters/${clusterId}/nodes`);
  return data;
}
