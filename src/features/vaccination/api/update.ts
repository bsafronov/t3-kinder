import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useVaccinationUpdate() {
  const kidId = useRouter().query.kidId as string;
  const ctx = api.useContext();

  const mutation = api.vaccinations.update.useMutation({
    onSuccess: () => {
      toast.success("Прививка обновлена!");
      void ctx.vaccinations.getAllByKid.invalidate({ kidId });
    },
  });

  return mutation;
}
