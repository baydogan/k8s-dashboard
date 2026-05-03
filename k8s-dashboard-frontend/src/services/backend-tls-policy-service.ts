import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_BACKEND_TLS_POLICIES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { BackendTLSPolicy } from "@/entities/backend-tls-policy";

export async function getBackendTLSPolicies(clusterId: string): Promise<BackendTLSPolicy[]> {
  if (USE_MOCK_DATA) return MOCK_BACKEND_TLS_POLICIES;
  const { data } = await apiClient.get<BackendTLSPolicy[]>(`/clusters/${clusterId}/backendtlspolicies`);
  return data;
}
