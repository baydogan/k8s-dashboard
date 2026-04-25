import type { LimitRange } from "@/entities/limit-range";
import { MOCK_LIMIT_RANGES } from "@/mocks";

export async function getLimitRanges(_clusterId: string): Promise<LimitRange[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false") return MOCK_LIMIT_RANGES;
  const res = await fetch(`/api/clusters/${_clusterId}/limitranges`);
  return res.json();
}
