import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_ROLE_BINDINGS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { RoleBinding } from "@/entities/role-binding";

export async function getRoleBindings(clusterId: string): Promise<RoleBinding[]> {
  if (USE_MOCK_DATA) return MOCK_ROLE_BINDINGS;
  const { data } = await apiClient.get<RoleBinding[]>(`/clusters/${clusterId}/rolebindings`);
  return data;
}
