import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();

  return api.noteTags.create.useMutation({
    onSuccess: (item) => {
      void ctx.noteTags.getManyByGroup.setData(
        { groupId: item.groupId },
        (list) => {
          if (list) {
            return [...list, item];
          }
          return [item];
        },
      );
      toast.success("Тег примечания добавлен!");
    },
  });
}

export function useUpdate() {
  const ctx = api.useContext();

  return api.noteTags.update.useMutation({
    onSuccess: (item) => {
      toast.success("Тег примечания обновлён!");
      void ctx.noteTags.getManyByGroup.setData(
        { groupId: item.groupId },
        (list) => {
          return list?.map((i) => {
            if (i.id === item.id) {
              return item;
            }
            return i;
          });
        },
      );
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
