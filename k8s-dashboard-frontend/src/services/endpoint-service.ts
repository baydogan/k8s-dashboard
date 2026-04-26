import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_ENDPOINTS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { Endpoint } from "@/entities/endpoint";

export async function getEndpoints(clusterId: string): Promise<Endpoint[]> {
  if (USE_MOCK_DATA) {
    return MOCK_ENDPOINTS;
  }
  const { data } = await apiClient.get<Endpoint[]>(`/clusters/${clusterId}/endpoints`);
  return data;
}
