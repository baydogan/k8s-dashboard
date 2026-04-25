import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { MOCK_JOBS } from "@/mocks";
import { apiClient } from "@/shared/lib/api-client";
import type { Job } from "@/entities/job";

export async function getJobs(clusterId: string): Promise<Job[]> {
  if (USE_MOCK_DATA) return MOCK_JOBS;
  const { data } = await apiClient.get<Job[]>(`/clusters/${clusterId}/jobs`);
  return data;
}
