import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_HPAS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { HorizontalPodAutoscaler } from "@/entities/hpa";

export async function getHPAs(clusterId: string): Promise<HorizontalPodAutoscaler[]> {
  if (USE_MOCK_DATA) return MOCK_HPAS;
  const { data } = await apiClient.get<HorizontalPodAutoscaler[]>(`/clusters/${clusterId}/horizontalpodautoscalers`);
  return data;
}
