import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_HTTP_ROUTES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { HTTPRoute } from "@/entities/http-route";

export async function getHTTPRoutes(clusterId: string): Promise<HTTPRoute[]> {
  if (USE_MOCK_DATA) return MOCK_HTTP_ROUTES;
  const { data } = await apiClient.get<HTTPRoute[]>(`/clusters/${clusterId}/httproutes`);
  return data;
}
