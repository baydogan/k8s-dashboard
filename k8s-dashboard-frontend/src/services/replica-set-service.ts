import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_REPLICA_SETS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { ReplicaSet } from "@/entities/replica-set";

export async function getReplicaSets(clusterId: string): Promise<ReplicaSet[]> {
  if (USE_MOCK_DATA) {
    return MOCK_REPLICA_SETS;
  }
  const { data } = await apiClient.get<ReplicaSet[]>(`/clusters/${clusterId}/replicasets`);
  return data;
}
