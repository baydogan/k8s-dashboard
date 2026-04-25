import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_PDBS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { PodDisruptionBudget } from "@/entities/pdb";

export async function getPodDisruptionBudgets(clusterId: string): Promise<PodDisruptionBudget[]> {
  if (USE_MOCK_DATA) return MOCK_PDBS;
  const { data } = await apiClient.get<PodDisruptionBudget[]>(`/clusters/${clusterId}/poddisruptionbudgets`);
  return data;
}
