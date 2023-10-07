import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const ctx = api.useContext();
  const session = useSession();
  const userId = session.data?.user.id ?? "";

  return api.groups.create.useMutation({
    onSuccess: (item) => {
      toast.success("Группа добавлена!");
      void ctx.groups.getManyByUser.setData({ userId }, (list) => {
        if (list) {
          return [...list, item];
        }
        return [item];
      });
    },
  });
}

export function useDelete() {
  const ctx = api.useContext();
  const session = useSession();
  const userId = session.data?.user.id ?? "";

  return api.groups.delete.useMutation({
    onSuccess: () => {
      toast.success("Группа удалена!");
      void ctx.groups.getManyByUser.invalidate({
        userId,
      });
    },
  });
}

export function useGetOne() {
  const groupId = useRouter().query.groupId as string;
  return api.groups.getOne.useQuery(
    {
      groupId,
    },
    {
      enabled: !!groupId,
    },
  );
}

export function useGetManyByUser() {
  const session = useSession();
  const userId = session.data?.user.id ?? "";

  return api.groups.getManyByUser.useQuery(
    {
      userId,
    },
    {
      enabled: !!userId,
    },
  );
}
