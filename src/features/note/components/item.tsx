import { format } from "date-fns";
import { ModalEnum } from "~/features/_core/modal";
import { useQueryString } from "~/shared/hooks/use-query-string";
import { Badge } from "~/shared/ui/badge";
import { type RouterOutputs } from "~/shared/utils/api";
import { EntityActions } from "~/shared/components/entity-actions";
import { noteAPI } from "..";
import { EntityItem } from "~/shared/components/entity-item";

type Props = RouterOutputs["notes"]["getManyByKid"][number];
export function NoteItem(note: Props) {
  const { pushQuery } = useQueryString();
  const { mutate: deleteNote } = noteAPI.useDelete();

  return (
    <EntityItem
      body={<Body {...note} />}
      actions={
        <EntityActions
          entity={note}
          onDelete={() => deleteNote({ noteId: note.id })}
          onUpdate={() =>
            pushQuery({ modal: ModalEnum.NOTE_EDIT, noteId: note.id })
          }
        />
      }
    />
  );
}

function Body(note: Props) {
  return (
    <>
      <Badge variant={"primary"}>
        {format(new Date(note.createdAt), "dd.MM.yyyy")}
      </Badge>
      <p>{note.description}</p>
      {note.tags.length > 0 && (
        <div className="mt-4 flex items-center gap-1">
          <span className="text-slate-500">Теги:</span>

          <div className=" flex gap-1">
            {note.tags.map((tag) => (
              <Badge key={tag.id} variant={"secondary"}>
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
