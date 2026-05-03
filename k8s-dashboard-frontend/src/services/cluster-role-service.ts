import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_CLUSTER_ROLES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { ClusterRole } from "@/entities/cluster-role";

export async function getClusterRoles(clusterId: string): Promise<ClusterRole[]> {
  if (USE_MOCK_DATA) return MOCK_CLUSTER_ROLES;
  const { data } = await apiClient.get<ClusterRole[]>(`/clusters/${clusterId}/clusterroles`);
  return data;
}
