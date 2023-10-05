import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useAbsenceTagUpdate() {
  const ctx = api.useContext();

  return api.absenceTags.update.useMutation({
    onSuccess: (item) => {
      void ctx.absenceTags.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Тег отсутствия обновлён!");
    },
  });
}
