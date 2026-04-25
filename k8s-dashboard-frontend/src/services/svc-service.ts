import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_KUBERNETES_SERVICES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { KubernetesService } from "@/entities/kubernetes-service";

export async function getKubernetesServices(clusterId: string): Promise<KubernetesService[]> {
  if (USE_MOCK_DATA) return MOCK_KUBERNETES_SERVICES;
  const { data } = await apiClient.get<KubernetesService[]>(`/clusters/${clusterId}/services`);
  return data;
}
