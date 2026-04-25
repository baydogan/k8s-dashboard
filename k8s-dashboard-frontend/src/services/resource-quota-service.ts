import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_RESOURCE_QUOTAS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { ResourceQuota } from "@/entities/resource-quota";

export async function getResourceQuotas(clusterId: string): Promise<ResourceQuota[]> {
  if (USE_MOCK_DATA) return MOCK_RESOURCE_QUOTAS;
  const { data } = await apiClient.get<ResourceQuota[]>(`/clusters/${clusterId}/resourcequotas`);
  return data;
}
