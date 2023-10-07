import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();

  return api.absenceTags.create.useMutation({
    onSuccess: (item) => {
      toast.success("Тег отсутствия добавлен!");
      void ctx.absenceTags.getManyByGroup.setData(
        { groupId: item.groupId },
        (list) => {
          if (list) {
            return [...list, item];
          }
          return [item];
        },
      );
    },
  });
}

export function useUpdate() {
  const ctx = api.useContext();

  return api.absenceTags.update.useMutation({
    onSuccess: (item) => {
      toast.success("Тег отсутствия обновлён!");
      void ctx.absenceTags.getManyByGroup.setData(
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
