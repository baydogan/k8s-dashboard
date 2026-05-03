import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_GRPC_ROUTES } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { GRPCRoute } from "@/entities/grpc-route";

export async function getGRPCRoutes(clusterId: string): Promise<GRPCRoute[]> {
  if (USE_MOCK_DATA) return MOCK_GRPC_ROUTES;
  const { data } = await apiClient.get<GRPCRoute[]>(`/clusters/${clusterId}/grpcroutes`);
  return data;
}
