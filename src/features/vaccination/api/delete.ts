import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useVaccinationDelete() {
  const kidId = useRouter().query.kidId as string;
  const ctx = api.useContext();

  return api.vaccinations.delete.useMutation({
    onSuccess: () => {
      void ctx.vaccinations.getAllByKid.invalidate({
        kidId,
      });
      toast.success("Прививка удалена!");
    },
  });
}
