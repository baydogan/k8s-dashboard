import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_ENDPOINT_SLICES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { EndpointSlice } from "@/entities/endpoint-slice";

export async function getEndpointSlices(clusterId: string): Promise<EndpointSlice[]> {
  if (USE_MOCK_DATA) {
    return MOCK_ENDPOINT_SLICES;
  }
  const { data } = await apiClient.get<EndpointSlice[]>(`/clusters/${clusterId}/endpointslices`);
  return data;
}
