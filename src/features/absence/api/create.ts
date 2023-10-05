import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { api } from "~/shared/utils/api";

export function useAbsenceCreate() {
  const kidId = useRouter().query.kidId as string;
  const ctx = api.useContext();

  return api.absences.create.useMutation({
    onSuccess: () => {
      void ctx.absences.getManyByKid.invalidate({ kidId });
      toast.success("Отсутствие добавлено!");
    },
  });
}
