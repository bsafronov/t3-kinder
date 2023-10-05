import { format } from "date-fns";
import { ModalEnum } from "~/features/_core/modal";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Badge } from "~/shared/ui/badge";
import { type RouterOutputs } from "~/shared/utils/api";
import { useAbsenceDelete } from "../api/delete";
import { EntityActions } from "~/shared/components/entity-actions";

type Props = RouterOutputs["absences"]["getManyByKid"][number];
export function AbsenceItem(absence: Props) {
  const { pushQuery } = useQueryString();
  const { mutate: deleteAbsence } = useAbsenceDelete();

  return (
    <div className="group px-4 py-2">
      <div className="flex justify-between">
        <div className="mb-1 flex">
          <Badge>{format(new Date(absence.date), "dd.MM.yyyy")}</Badge>
        </div>
        <EntityActions
          entity={absence}
          onDelete={() => deleteAbsence({ absenceId: absence.id })}
          onUpdate={() =>
            pushQuery({ modal: ModalEnum.ABSENCE_EDIT, absenceId: absence.id })
          }
        />
      </div>
      <div className="flex gap-1 text-xs">
        <span className="text-slate-500">Причина: </span>
        <p>{absence.reason}</p>
      </div>
      {absence.tags.length > 0 && (
        <div className="flex gap-1 text-xs">
          <span>Теги:</span>
          <div>
            {absence.tags.map((tag) => (
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
