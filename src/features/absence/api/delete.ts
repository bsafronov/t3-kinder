import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useAbsenceDelete() {
  const ctx = api.useContext();

  const mutation = api.absences.delete.useMutation({
    onSuccess: (item) => {
      toast.success("День отсутствия удалён!");
      void ctx.absences.getManyByKid.invalidate({ kidId: item.kidId });
    },
  });

  return mutation;
}
