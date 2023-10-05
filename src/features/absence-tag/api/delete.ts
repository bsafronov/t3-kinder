import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useAbsenceTagDelete() {
  const ctx = api.useContext();

  return api.absenceTags.delete.useMutation({
    onSuccess: (item) => {
      void ctx.absenceTags.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Тег отсутствия удалён!");
    },
  });
}
