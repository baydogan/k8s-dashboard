import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_OVERVIEW } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { OverviewData } from "@/mocks";

export async function getOverview(clusterId: string): Promise<OverviewData> {
  if (USE_MOCK_DATA) {
    return MOCK_OVERVIEW;
  }
  const { data } = await apiClient.get<OverviewData>(`/clusters/${clusterId}/overview`);
  return data;
}
