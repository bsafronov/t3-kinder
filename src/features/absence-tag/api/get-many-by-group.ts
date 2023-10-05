import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function useAbsenceTagGetManyByGroup() {
  const groupId = useRouter().query.groupId as string;

  return api.absenceTags.getManyByGroup.useQuery(
    {
      groupId,
    },
    { enabled: !!groupId },
  );
}
