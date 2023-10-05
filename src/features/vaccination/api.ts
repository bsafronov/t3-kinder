import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useCreate() {
  const kidId = useRouter().query.kidId as string;
  const ctx = api.useContext();

  return api.vaccinations.create.useMutation({
    onSuccess: () => {
      void ctx.vaccinations.getManyByKid.invalidate({ kidId });
      toast.success("Прививка добавлена!");
    },
  });
}

export function useUpdate() {
  const kidId = useRouter().query.kidId as string;
  const ctx = api.useContext();

  const mutation = api.vaccinations.update.useMutation({
    onSuccess: () => {
      toast.success("Прививка обновлена!");
      void ctx.vaccinations.getManyByKid.invalidate({ kidId });
    },
  });

  return mutation;
}

export function useDelete() {
  const kidId = useRouter().query.kidId as string;
  const ctx = api.useContext();

  return api.vaccinations.delete.useMutation({
    onSuccess: () => {
      void ctx.vaccinations.getManyByKid.invalidate({
        kidId,
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
