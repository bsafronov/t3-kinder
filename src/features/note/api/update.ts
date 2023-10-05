import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useNoteUpdate() {
  const ctx = api.useContext();

  const mutation = api.notes.update.useMutation({
    onSuccess: (item) => {
      toast.success("Примечание обновлено!");
      void ctx.notes.getManyByKid.invalidate({ kidId: item.kidId });
    },
  });

  return mutation;
}
