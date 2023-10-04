import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

type Props = {
  backOnSuccess?: boolean;
};
export function useParentCreate(opts?: Props) {
  const router = useRouter();
  const ctx = api.useContext();

  const mutation = api.parents.create.useMutation({
    onSuccess: () => {
      toast.success("Родитель создан!");
      void ctx.parents.getAll.invalidate();
      opts?.backOnSuccess && router.back();
    },
  });

  return mutation;
}
