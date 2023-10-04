import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function useVaccinationTagGetManyByGroup() {
  const groupId = useRouter().query.groupId as string;

  return api.vaccinationTags.getAllByGroup.useQuery(
    {
      groupId,
    },
    { enabled: !!groupId },
  );
}
