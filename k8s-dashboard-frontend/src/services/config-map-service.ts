import type { ConfigMap } from "@/entities/config-map";
import { MOCK_CONFIG_MAPS } from "@/mocks";

export async function getConfigMaps(_clusterId: string): Promise<ConfigMap[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false") return MOCK_CONFIG_MAPS;
  const res = await fetch(`/api/clusters/${_clusterId}/configmaps`);
  return res.json();
}
