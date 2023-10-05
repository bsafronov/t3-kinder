import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();

  return api.absenceTags.create.useMutation({
    onSuccess: (item) => {
      toast.success("Тег отсутствия добавлен!");
      void ctx.absenceTags.getManyByGroup.invalidate({ groupId: item.groupId });
    },
  });
}

export function useUpdate() {
  const ctx = api.useContext();

  return api.absenceTags.update.useMutation({
    onSuccess: (item) => {
      void ctx.absenceTags.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Тег отсутствия обновлён!");
    },
  });
}

export function useDelete() {
  const ctx = api.useContext();

  return api.absenceTags.delete.useMutation({
    onSuccess: (item) => {
      void ctx.absenceTags.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Тег отсутствия удалён!");
    },
  });
}

export function useGetManyByGroup() {
  const groupId = useRouter().query.groupId as string;

  return api.absenceTags.getManyByGroup.useQuery(
    {
      groupId,
    },
    { enabled: !!groupId },
  );
}
