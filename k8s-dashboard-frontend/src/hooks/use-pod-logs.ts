"use client";

import { useQuery } from "@tanstack/react-query";
import { getPodLogs } from "@/services/log-service";

export function usePodLogs(
  clusterId: string,
  namespace: string,
  podName: string,
  container: string,
  tailLines: number
) {
  return useQuery({
    queryKey: ["pod-logs", clusterId, namespace, podName, container, tailLines],
    queryFn: () => getPodLogs(clusterId, namespace, podName, container, tailLines),
    staleTime: 0,
    gcTime: 60_000,
    enabled: !!podName && !!container,
  });
}
