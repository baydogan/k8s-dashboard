import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_CRONJOBS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { CronJob } from "@/entities/cronjob";

export async function getCronJobs(clusterId: string): Promise<CronJob[]> {
  if (USE_MOCK_DATA) return MOCK_CRONJOBS;
  const { data } = await apiClient.get<CronJob[]>(`/clusters/${clusterId}/cronjobs`);
  return data;
}
