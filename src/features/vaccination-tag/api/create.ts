import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useVaccinationTagCreate() {
  const groupId = useRouter().query.groupId as string;
  const ctx = api.useContext();

  return api.vaccinationTags.create.useMutation({
    onSuccess: () => {
      void ctx.vaccinationTags.getAllByGroup.invalidate({ groupId });
      toast.success("Прививка добавлена в перечень!");
    },
  });
}
