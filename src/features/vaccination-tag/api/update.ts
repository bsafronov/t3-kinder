import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useVaccinationTagUpdate() {
  const groupId = useRouter().query.groupId as string;
  const ctx = api.useContext();

  return api.vaccinationTags.update.useMutation({
    onSuccess: () => {
      void ctx.vaccinationTags.getAllByGroup.invalidate({ groupId });
      toast.success("Перечень прививок обновлён!");
    },
  });
}
