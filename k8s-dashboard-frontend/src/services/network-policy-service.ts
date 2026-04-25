import type { NetworkPolicy } from "@/entities/network-policy";
import { MOCK_NETWORK_POLICIES } from "@/mocks";

export async function getNetworkPolicies(_clusterId: string): Promise<NetworkPolicy[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false") return MOCK_NETWORK_POLICIES;
  const res = await fetch(`/api/clusters/${_clusterId}/networkpolicies`);
  return res.json();
}
