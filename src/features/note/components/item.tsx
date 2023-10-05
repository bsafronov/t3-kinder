import { format } from "date-fns";
import { ModalEnum } from "~/features/_core/modal";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Badge } from "~/shared/ui/badge";
import { type RouterOutputs } from "~/shared/utils/api";
import { EntityActions } from "~/shared/components/entity-actions";
import { noteAPI } from "..";

type Props = RouterOutputs["notes"]["getManyByKid"][number];
export function NoteItem(note: Props) {
  const { pushQuery } = useQueryString();
  const { mutate: deleteNote } = noteAPI.useDelete();

  return (
    <div className="group px-4 py-2">
      <div className="flex justify-between">
        <div className="mb-1 flex">
          <Badge>{format(new Date(note.createdAt), "dd.MM.yyyy")}</Badge>
        </div>
        <EntityActions
          entity={note}
          onDelete={() => deleteNote({ noteId: note.id })}
          onUpdate={() =>
            pushQuery({ modal: ModalEnum.NOTE_EDIT, noteId: note.id })
          }
        />
      </div>
      <div className="text-xs">
        <p>
          <span className="text-slate-500">Примечание: </span>
          {note.description}
        </p>
      </div>
      {note.tags.length > 0 && (
        <div className="mt-1 flex items-center gap-1 text-xs">
          <div>
            <span className="text-slate-500">Теги:</span>
          </div>
          <div className="flex gap-1">
            {note.tags.map((tag) => (
              <Badge key={tag.id} variant={"secondary"} className="text-xs">
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
