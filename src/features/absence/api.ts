import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();

  return api.absences.create.useMutation({
    onSuccess: (item) => {
      toast.success("Отсутствие добавлено!");
      void ctx.absences.getManyByKid.invalidate({ kidId: item.kidId });
    },
  });
}

export function useUpdate() {
  const ctx = api.useContext();

  const mutation = api.absences.update.useMutation({
    onSuccess: (item) => {
      toast.success("День отсутствия обновлён!");
      void ctx.absences.getManyByKid.invalidate({ kidId: item.kidId });
    },
  });

  return mutation;
}

export function useDelete() {
  const ctx = api.useContext();

  const mutation = api.absences.delete.useMutation({
    onSuccess: (item) => {
      toast.success("День отсутствия удалён!");
      void ctx.absences.getManyByKid.invalidate({ kidId: item.kidId });
    },
  });

  return mutation;
}

export function useGetOne() {
  const absenceId = useRouter().query.absenceId as string;

  return api.absences.getOne.useQuery(
    {
      absenceId,
    },
    { enabled: !!absenceId },
  );
}

export function useGetManyByKid() {
  const kidId = useRouter().query.kidId as string;

  return api.absences.getManyByKid.useQuery(
    {
      kidId,
    },
    { enabled: !!kidId },
  );
}
