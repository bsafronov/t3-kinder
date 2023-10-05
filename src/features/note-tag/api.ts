import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();

  return api.noteTags.create.useMutation({
    onSuccess: (item) => {
      void ctx.noteTags.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Тег примечания добавлен!");
    },
  });
}

export function useUpdate() {
  const ctx = api.useContext();

  return api.noteTags.update.useMutation({
    onSuccess: (item) => {
      void ctx.noteTags.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Тег примечания обновлён!");
    },
  });
}

export function useDelete() {
  const ctx = api.useContext();

  return api.noteTags.delete.useMutation({
    onSuccess: (item) => {
      void ctx.noteTags.getManyByGroup.invalidate({ groupId: item.groupId });
      toast.success("Тег примечания удалён!");
    },
  });
}

export function useGetManyByGroup() {
  const groupId = useRouter().query.groupId as string;

  return api.noteTags.getManyByGroup.useQuery(
    {
      groupId,
    },
    { enabled: !!groupId },
  );
}
