import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_NAMESPACES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { Namespace } from "@/entities/namespace";

export async function getNamespaces(clusterId: string): Promise<Namespace[]> {
  if (USE_MOCK_DATA) {
    return MOCK_NAMESPACES;
  }
  const { data } = await apiClient.get<Namespace[]>(`/clusters/${clusterId}/namespaces`);
  return data;
}
