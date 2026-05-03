import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_BACKEND_TRAFFIC_POLICIES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { BackendTrafficPolicy } from "@/entities/backend-traffic-policy";

export async function getBackendTrafficPolicies(clusterId: string): Promise<BackendTrafficPolicy[]> {
  if (USE_MOCK_DATA) return MOCK_BACKEND_TRAFFIC_POLICIES;
  const { data } = await apiClient.get<BackendTrafficPolicy[]>(`/clusters/${clusterId}/backendtrafficpolicies`);
  return data;
}
