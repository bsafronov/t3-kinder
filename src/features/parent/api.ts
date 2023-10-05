import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();
  const kidId = useRouter().query.kidId as string;

  const mutation = api.parents.create.useMutation({
    onSuccess: () => {
      toast.success("Родитель создан!");
      void ctx.parents.getManyByKid.invalidate({ kidId });
    },
  });

  return mutation;
}

export function useUpdate() {
  const ctx = api.useContext();
  const kidId = useRouter().query.kidId as string;

  const mutation = api.parents.update.useMutation({
    onSuccess: () => {
      toast.success("Родитель обновлён!");
      void ctx.parents.getManyByKid.invalidate({ kidId });
    },
  });

  return mutation;
}

export function useDelete() {
  const ctx = api.useContext();
  const kidId = useRouter().query.kidId as string;

  const mutation = api.parents.delete.useMutation({
    onSuccess: () => {
      toast.success("Родитель удалён!");
      void ctx.parents.getManyByKid.invalidate({ kidId });
    },
  });

  return mutation;
}

export function useGetOne() {
  const parentId = useRouter().query.parentId as string;

  return api.parents.getOne.useQuery({ parentId }, { enabled: !!parentId });
}

export function useGetManyByKid() {
  const kidId = useRouter().query.kidId as string;
  return api.parents.getManyByKid.useQuery({ kidId }, { enabled: !!kidId });
}