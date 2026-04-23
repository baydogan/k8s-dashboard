import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_EVENTS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { ClusterEvent } from "@/entities/event";

export async function getEvents(clusterId: string): Promise<ClusterEvent[]> {
  if (USE_MOCK_DATA) {
    return MOCK_EVENTS;
  }
  const { data } = await apiClient.get<ClusterEvent[]>(`/clusters/${clusterId}/events`);
  return data;
}
