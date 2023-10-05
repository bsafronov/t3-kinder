import { Plus } from "lucide-react";
import { ModalEnum } from "~/features/_core/modal/query.types";
import { NoteItem, useNoteGetManyByKid } from "~/features/note";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";

export function KidNotes() {
  const { pushQuery } = useQueryString();
  const { data: notes, isSuccess } = useNoteGetManyByKid();

  return (
    <Card className="overflow-hidden">
      {isSuccess && notes.length === 0 && (
        <div className="border-b px-4 py-1 text-sm text-slate-500">
          У ребёнка пока не указаны примечания
        </div>
      )}
      {isSuccess && notes.length > 0 && (
        <ul className="divide-y border-b">
          {notes.map((note) => (
            <li key={note.id}>
              <NoteItem {...note} />
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-end px-4 py-2">
        <Button
          variant={"link"}
          size={"contents"}
          onClick={() => pushQuery({ modal: ModalEnum.NOTE_CREATE })}
        >
          <Plus className="h-3 w-3" />
          Добавить примечание
        </Button>
      </div>
    </Card>
  );
}
