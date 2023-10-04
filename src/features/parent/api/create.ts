import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useParentCreate() {
  const ctx = api.useContext();

  const mutation = api.parents.create.useMutation({
    onSuccess: () => {
      toast.success("Родитель создан!");
      void ctx.parents.getAll.invalidate();
    },
  });

  return mutation;
}
