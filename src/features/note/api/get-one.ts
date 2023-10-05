import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function useNoteGetOne() {
  const noteId = useRouter().query.noteId as string;

  return api.notes.getOne.useQuery(
    {
      noteId,
    },
    { enabled: !!noteId },
  );
}
