import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function useAbsenceGetManyByKid() {
  const kidId = useRouter().query.kidId as string;

  return api.absences.getManyByKid.useQuery({
    kidId,
  });
}
