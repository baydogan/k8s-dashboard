import type { Role } from "@/entities/role";
import { MOCK_ROLES } from "@/mocks";

export async function getRoles(_clusterId: string): Promise<Role[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false") return MOCK_ROLES;
  const res = await fetch(`/api/clusters/${_clusterId}/roles`);
  return res.json();
}
