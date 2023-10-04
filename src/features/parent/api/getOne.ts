import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function useParentGetOne() {
  const parentId = useRouter().query.parentId as string;

  return api.parents.getById.useQuery({ parentId }, { enabled: !!parentId });
}
