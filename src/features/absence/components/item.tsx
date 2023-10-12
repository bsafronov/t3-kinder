import { format } from "date-fns";
import { ModalEnum } from "~/features/_core/modal";
import { useQueryString } from "~/shared/hooks/use-query-string";
import { Badge } from "~/shared/ui/badge";
import { type RouterOutputs } from "~/shared/utils/api";
import { EntityActions } from "~/shared/components/entity-actions";
import { absenceAPI } from "..";
import { EntityItem } from "~/shared/components/entity-item";

type Props = RouterOutputs["absences"]["getManyByKid"][number];
export function AbsenceItem(absence: Props) {
  const { pushQuery } = useQueryString();
  const { mutate: deleteAbsence } = absenceAPI.useDelete();

  return (
    <EntityItem
      body={<Body {...absence} />}
      actions={
        <EntityActions
          entity={absence}
          onDelete={() => deleteAbsence({ absenceId: absence.id })}
          onUpdate={() =>
            pushQuery({ modal: ModalEnum.ABSENCE_EDIT, absenceId: absence.id })
          }
        />
      }
    />
  );
}

function Body(absence: Props) {
  return (
    <>
      <Badge variant={"primary"}>
        {format(new Date(absence.date), "dd.MM.yyyy")}
      </Badge>
      {absence.reason && <p>{absence.reason}</p>}
      {absence.tags.length > 0 && (
        <div className="mt-4 flex items-center gap-1">
          <span className="text-slate-500">Теги: </span>
          <div className="flex gap-1">
            {absence.tags.map((tag) => (
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
