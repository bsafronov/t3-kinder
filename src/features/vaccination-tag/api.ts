import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const groupId = useRouter().query.groupId as string;
  const ctx = api.useContext();

  return api.vaccinationTags.create.useMutation({
    onSuccess: (item) => {
      toast.success("Прививка добавлена в перечень!");
      void ctx.vaccinationTags.getManyByGroup.setData({ groupId }, (list) => {
        if (list) {
          return [...list, item];
        }
        return [item];
      });
    },
  });
}

export function useUpdate() {
  const groupId = useRouter().query.groupId as string;
  const ctx = api.useContext();

  return api.vaccinationTags.update.useMutation({
    onSuccess: () => {
      void ctx.vaccinationTags.getManyByGroup.invalidate({ groupId });
      toast.success("Перечень прививок обновлён!");
    },
  });
}

export function useDelete() {
  const groupId = useRouter().query.groupId as string;
  const ctx = api.useContext();

  return api.vaccinationTags.delete.useMutation({
    onSuccess: () => {
      void ctx.vaccinations.getManyByGroup.invalidate({ groupId });
      toast.success("Прививка удалена из перечня!");
    },
  });
}

export function useGetManyByGroup() {
  const groupId = useRouter().query.groupId as string;

  return api.vaccinationTags.getManyByGroup.useQuery(
    {
      groupId,
    },
    { enabled: !!groupId },
  );
}
