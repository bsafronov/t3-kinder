import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useVaccinationTagDelete() {
  const groupId = useRouter().query.groupId as string;
  const ctx = api.useContext();

  return api.vaccinationTags.delete.useMutation({
    onSuccess: () => {
      void ctx.vaccinations.getAllByGroup.invalidate({ groupId });
      toast.success("Прививка удалена из перечня!");
    },
  });
}
