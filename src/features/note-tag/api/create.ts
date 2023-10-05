import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useNoteTagCreate() {
  const ctx = api.useContext();

  return api.noteTags.create.useMutation({
    onSuccess: (item) => {
      void ctx.noteTags.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Тег примечания добавлен!");
    },
  });
}
