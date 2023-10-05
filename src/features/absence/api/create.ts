import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useAbsenceCreate() {
  const ctx = api.useContext();

  return api.absences.create.useMutation({
    onSuccess: (item) => {
      void ctx.absences.getManyByKid.invalidate({ kidId: item.kidId });
      toast.success("Отсутствие добавлено!");
    },
  });
}
