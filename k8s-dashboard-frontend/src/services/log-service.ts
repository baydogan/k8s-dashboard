import { USE_MOCK_DATA } from "@/shared/config/app-config";
import { apiClient } from "@/shared/lib/api-client";
import { generateMockPodLogs } from "@/mocks/data/pod-logs";

export async function getPodLogs(
  clusterId: string,
  namespace: string,
  podName: string,
  container: string,
  tailLines: number
): Promise<string> {
  if (USE_MOCK_DATA) {
    return generateMockPodLogs(podName, container, tailLines);
  }
  const { data } = await apiClient.get<string>(
    `/clusters/${clusterId}/pods/${namespace}/${podName}/logs`,
    { params: { container, tailLines }, responseType: "text" }
  );
  return data;
}
