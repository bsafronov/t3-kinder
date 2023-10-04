import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useParentDelete() {
  const ctx = api.useContext();

  const mutation = api.parents.delete.useMutation({
    onSuccess: () => {
      toast.success("Родитель удалён!");
      void ctx.parents.getAll.invalidate();
    },
  });

  return mutation;
}
