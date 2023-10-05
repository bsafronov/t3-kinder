import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function useNoteGetManyByKid() {
  const kidId = useRouter().query.kidId as string;

  return api.notes.getManyByKid.useQuery(
    {
      kidId,
    },
    { enabled: !!kidId },
  );
}
