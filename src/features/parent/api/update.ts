import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useParentUpdate() {
  const ctx = api.useContext();

  const mutation = api.parents.update.useMutation({
    onSuccess: () => {
      toast.success("Родитель обновлён!");
      void ctx.parents.getAll.invalidate();
    },
  });

  return mutation;
}
