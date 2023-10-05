import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function useAbsenceGetOne() {
  const absenceId = useRouter().query.absenceId as string;

  return api.absences.getOne.useQuery(
    {
      absenceId,
    },
    { enabled: !!absenceId },
  );
}
