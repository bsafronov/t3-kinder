import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function useNoteTagGetManyByGroup() {
  const groupId = useRouter().query.groupId as string;

  return api.noteTags.getManyByGroup.useQuery(
    {
      groupId,
    },
    { enabled: !!groupId },
  );
}
