import type { Secret } from "@/entities/secret";
import { MOCK_SECRETS } from "@/mocks";

export async function getSecrets(_clusterId: string): Promise<Secret[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false") return MOCK_SECRETS;
  const res = await fetch(`/api/clusters/${_clusterId}/secrets`);
  return res.json();
}
