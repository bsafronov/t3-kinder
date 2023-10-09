import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();

  return api.notes.create.useMutation({
    onSuccess: (item) => {
      toast.success("Примечание добавлено!");
      void ctx.notes.getManyByKid.setData({ kidId: item.kidId }, (list) => {
        if (list) {
          return [...list, item];
        }
        return [item];
      });
    },
  });
}

export function useUpdate() {
  const ctx = api.useContext();

  return api.notes.update.useMutation({
    onSuccess: (item) => {
      toast.success("Примечание обновлено!");
      void ctx.notes.getManyByKid.setData({ kidId: item.kidId }, (list) => {
        return list?.map((i) => {
          if (i.id === item.id) {
            return item;
          }
          return i;
        });
      });
    },
  });
}

export function useDelete() {
  const ctx = api.useContext();

  const mutation = api.notes.delete.useMutation({
    onSuccess: (item) => {
      toast.success("Примечание удалено!");
      void ctx.absences.getManyByKid.invalidate({ kidId: item.kidId });
    },
  });

  return mutation;
}

export function useGetOne() {
  const noteId = useRouter().query.noteId as string;

  return api.notes.getOne.useQuery(
    {
      noteId,
    },
    { enabled: !!noteId },
  );
}

export function useGetManyByKid() {
  const kidId = useRouter().query.kidId as string;

  return api.notes.getManyByKid.useQuery(
    {
      kidId,
    },
    { enabled: !!kidId },
  );
}

export function useGetManyByGroup() {
  const groupId = useRouter().query.groupId as string;

  return api.notes.getManyByGroup.useQuery(
    {
      groupId,
    },
    { enabled: !!groupId },
  );
}
