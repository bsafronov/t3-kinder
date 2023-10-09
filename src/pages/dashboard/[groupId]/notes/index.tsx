import { NoteTable } from "~/features/note";
import { Heading } from "~/shared/ui/title";

export default function NotesPage() {
  return (
    <>
      <Heading title="Примечания" />
      <NoteTable />
    </>
  );
}
