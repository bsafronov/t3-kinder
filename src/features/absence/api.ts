import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();

  return api.absences.create.useMutation({
    onSuccess: (item) => {
      toast.success("Отсутствие добавлено!");
      void ctx.absences.getManyByKid.setData({ kidId: item.kidId }, (list) => {
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

  const mutation = api.absences.update.useMutation({
    onSuccess: (item) => {
      toast.success("День отсутствия обновлён!");
      void ctx.absences.getManyByKid.setData({ kidId: item.kidId }, (list) => {
        return list?.map((i) => {
          if (i.id === item.id) {
            return item;
          }
          return i;
        });
      });
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

type GetInfiniteByGroupProps = {
  search?: string;
  tagIDs?: string[];
};

export function useGetInfiniteByGroup(props?: GetInfiniteByGroupProps) {
  const groupId = useRouter().query.groupId as string;
  return api.absences.getInfiniteByGroup.useInfiniteQuery(
    {
      search: props?.search,
      tagIDs: props?.tagIDs ?? [],
      groupId,
      limit: 20,
    },
    {
      enabled: !!groupId,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
}

export function useGetCountByGroup() {
  const groupId = useRouter().query.groupId as string;

  return api.absences.getCountByGroup.useQuery(
    { groupId },
    { enabled: !!groupId },
  );
}
