import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_REFERENCE_GRANTS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { ReferenceGrant } from "@/entities/reference-grant";

export async function getReferenceGrants(clusterId: string): Promise<ReferenceGrant[]> {
  if (USE_MOCK_DATA) return MOCK_REFERENCE_GRANTS;
  const { data } = await apiClient.get<ReferenceGrant[]>(`/clusters/${clusterId}/referencegrants`);
  return data;
}
