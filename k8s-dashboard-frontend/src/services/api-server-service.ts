import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_API_SERVER } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { ApiServerSloData } from "@/entities/api-server";

export async function getApiServerSlo(clusterId: string): Promise<ApiServerSloData> {
  if (USE_MOCK_DATA) {
    return MOCK_API_SERVER;
  }
  const { data } = await apiClient.get<ApiServerSloData>(`/clusters/${clusterId}/api-server/slo`);
  return data;
}
