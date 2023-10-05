import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useNoteCreate() {
  const ctx = api.useContext();

  return api.notes.create.useMutation({
    onSuccess: (item) => {
      void ctx.notes.getManyByKid.invalidate({ kidId: item.kidId });
      toast.success("Примечание добавлено!");
    },
  });
}
