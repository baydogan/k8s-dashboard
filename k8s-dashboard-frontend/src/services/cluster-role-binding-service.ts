import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_CLUSTER_ROLE_BINDINGS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { ClusterRoleBinding } from "@/entities/cluster-role-binding";

export async function getClusterRoleBindings(clusterId: string): Promise<ClusterRoleBinding[]> {
  if (USE_MOCK_DATA) return MOCK_CLUSTER_ROLE_BINDINGS;
  const { data } = await apiClient.get<ClusterRoleBinding[]>(`/clusters/${clusterId}/clusterrolebindings`);
  return data;
}
