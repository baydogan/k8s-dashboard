import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_INGRESS_CLASSES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { IngressClass } from "@/entities/ingress-class";

export async function getIngressClasses(clusterId: string): Promise<IngressClass[]> {
  if (USE_MOCK_DATA) return MOCK_INGRESS_CLASSES;
  const { data } = await apiClient.get<IngressClass[]>(`/clusters/${clusterId}/ingressclasses`);
  return data;
}
