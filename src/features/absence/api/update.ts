import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useAbsenceUpdate() {
  const ctx = api.useContext();

  const mutation = api.absences.update.useMutation({
    onSuccess: () => {
      toast.success("День отсутствия обновлён!");
      void ctx.absences.getManyByKid.invalidate();
    },
  });

  return mutation;
}
