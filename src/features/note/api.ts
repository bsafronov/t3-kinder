import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();

  return api.notes.create.useMutation({
    onSuccess: (item) => {
      void ctx.notes.getManyByKid.invalidate({ kidId: item.kidId });
      toast.success("Примечание добавлено!");
    },
  });
}

export function useUpdate() {
  const ctx = api.useContext();

  return api.notes.update.useMutation({
    onSuccess: (item) => {
      toast.success("Примечание обновлено!");
      void ctx.notes.getManyByKid.invalidate({ kidId: item.kidId });
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

export function useGetManyByKid() {
  const kidId = useRouter().query.kidId as string;

  return api.notes.getManyByKid.useQuery(
    {
      kidId,
    },
    { enabled: !!kidId },
  );
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
