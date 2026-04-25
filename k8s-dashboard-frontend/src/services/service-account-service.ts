import type { ServiceAccount } from "@/entities/service-account";
import { MOCK_SERVICE_ACCOUNTS } from "@/mocks";

export async function getServiceAccounts(_clusterId: string): Promise<ServiceAccount[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false") return MOCK_SERVICE_ACCOUNTS;
  const res = await fetch(`/api/clusters/${_clusterId}/serviceaccounts`);
  return res.json();
}
