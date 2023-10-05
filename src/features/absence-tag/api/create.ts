import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useAbsenceTagCreate() {
  const ctx = api.useContext();

  return api.absenceTags.create.useMutation({
    onSuccess: (item) => {
      void ctx.absenceTags.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Отсутствие добавлено!");
    },
  });
}
