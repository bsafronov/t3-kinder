import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useNoteDelete() {
  const ctx = api.useContext();

  const mutation = api.notes.delete.useMutation({
    onSuccess: (item) => {
      toast.success("Примечание удалено!");
      void ctx.absences.getManyByKid.invalidate({ kidId: item.kidId });
    },
  });

  return mutation;
}
