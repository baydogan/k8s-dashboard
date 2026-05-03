import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_GATEWAY_CLASSES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { GatewayClass } from "@/entities/gateway-class";

export async function getGatewayClasses(clusterId: string): Promise<GatewayClass[]> {
  if (USE_MOCK_DATA) return MOCK_GATEWAY_CLASSES;
  const { data } = await apiClient.get<GatewayClass[]>(`/clusters/${clusterId}/gatewayclasses`);
  return data;
}
