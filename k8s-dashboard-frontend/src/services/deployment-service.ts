import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_DEPLOYMENTS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { Deployment } from "@/entities/deployment";

export async function getDeployments(clusterId: string): Promise<Deployment[]> {
  if (USE_MOCK_DATA) {
    return MOCK_DEPLOYMENTS;
  }
  const { data } = await apiClient.get<Deployment[]>(`/clusters/${clusterId}/deployments`);
  return data;
}
