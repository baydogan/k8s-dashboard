import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_CLUSTERS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { Cluster } from "@/entities/cluster";

export async function getClusters(): Promise<Cluster[]> {
  if (USE_MOCK_DATA) {
    return MOCK_CLUSTERS;
  }
  const { data } = await apiClient.get<Cluster[]>("/clusters");
  return data;
}
