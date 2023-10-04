import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function useVaccinationGetOne() {
  const vaccinationId = useRouter().query.vaccinationId as string;

  return api.vaccinations.getOneByKid.useQuery(
    { vaccinationId },
    { enabled: !!vaccinationId },
  );
}
