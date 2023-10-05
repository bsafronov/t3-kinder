import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();

  return api.kids.create.useMutation({
    onSuccess: (item) => {
      void ctx.kids.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Ребёнок добавлен!");
    },
  });
}

export function useUpdate() {
  const ctx = api.useContext();

  return api.kids.update.useMutation({
    onSuccess: (item) => {
      toast.success("Ребёнок обновлён!");
      void ctx.kids.getManyByGroup.invalidate({ groupId: item.groupId });
    },
  });
}

export function useDelete() {
  const ctx = api.useContext();

  const mutation = api.kids.delete.useMutation({
    onSuccess: (item) => {
      toast.success("Примечание удалено!");
      void ctx.kids.getManyByGroup.invalidate({ groupId: item.groupId });
    },
  });

  return mutation;
}

export function useGetOne() {
  const kidId = useRouter().query.kidId as string;

  return api.kids.getOne.useQuery(
    {
      kidId,
    },
    { enabled: !!kidId },
  );
}

export function useGetManyByGroup() {
  const groupId = useRouter().query.groupId as string;
  return api.kids.getManyByGroup.useQuery(
    { groupId },
    {
      enabled: !!groupId,
    },
  );
}
