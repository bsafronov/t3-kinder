import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const kidId = useRouter().query.kidId as string;
  const ctx = api.useContext();

  return api.vaccinations.create.useMutation({
    onSuccess: (item) => {
      void ctx.vaccinations.getManyByKid.setData({ kidId }, (list) => {
        if (list) {
          return [...list, item];
        }
        return [item];
      });
      toast.success("Прививка добавлена!");
    },
  });
}

export function useUpdate() {
  const kidId = useRouter().query.kidId as string;
  const ctx = api.useContext();

  const mutation = api.vaccinations.update.useMutation({
    onSuccess: (item) => {
      void ctx.vaccinations.getManyByKid.setData({ kidId }, (list) => {
        return list?.map((i) => {
          if (i.id === item.id) {
            return item;
          }
          return i;
        });
      });
      toast.success("Прививка обновлена!");
    },
  });

  return mutation;
}

export function useDelete() {
  const kidId = useRouter().query.kidId as string;
  const ctx = api.useContext();

  return api.vaccinations.delete.useMutation({
    onSuccess: (item) => {
      void ctx.vaccinations.getManyByKid.setData({ kidId }, (list) => {
        return list?.filter((i) => i.id !== item.id);
      });
      toast.success("Прививка удалена!");
    },
  });
}

export function useGetOne() {
  const vaccinationId = useRouter().query.vaccinationId as string;

  return api.vaccinations.getOne.useQuery(
    { vaccinationId },
    { enabled: !!vaccinationId },
  );
}

export function useGetManyByKid() {
  const kidId = useRouter().query.kidId as string;
  return api.vaccinations.getManyByKid.useQuery(
    {
      kidId,
    },
    {
      enabled: !!kidId,
    },
  );
}

type GetInfiniteByGroupProps = {
  search?: string;
  tagIDs?: string[];
};

export function useGetInfiniteByGroup(props?: GetInfiniteByGroupProps) {
  const groupId = useRouter().query.groupId as string;
  return api.vaccinations.getInfiniteByGroup.useInfiniteQuery(
    {
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

  return api.vaccinations.getCountByGroup.useQuery(
    { groupId },
    { enabled: !!groupId },
  );
}
