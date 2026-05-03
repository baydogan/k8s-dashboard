import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_GATEWAYS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { Gateway } from "@/entities/gateway";

export async function getGateways(clusterId: string): Promise<Gateway[]> {
  if (USE_MOCK_DATA) return MOCK_GATEWAYS;
  const { data } = await apiClient.get<Gateway[]>(`/clusters/${clusterId}/gateways`);
  return data;
}
