import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_INGRESSES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { KubernetesIngress } from "@/entities/ingress";

export async function getIngresses(clusterId: string): Promise<KubernetesIngress[]> {
  if (USE_MOCK_DATA) return MOCK_INGRESSES;
  const { data } = await apiClient.get<KubernetesIngress[]>(`/clusters/${clusterId}/ingresses`);
  return data;
}
