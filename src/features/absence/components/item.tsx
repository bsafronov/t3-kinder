import { format } from "date-fns";
import { ModalEnum } from "~/features/_core/modal";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Badge } from "~/shared/ui/badge";
import { type RouterOutputs } from "~/shared/utils/api";
import { EntityActions } from "~/shared/components/entity-actions";
import { absenceAPI } from "..";

type Props = RouterOutputs["absences"]["getManyByKid"][number];
export function AbsenceItem(absence: Props) {
  const { pushQuery } = useQueryString();
  const { mutate: deleteAbsence } = absenceAPI.useDelete();

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
      <div className="text-xs">
        <p>
          <span className="text-slate-500">Причина: </span>
          {absence.reason}
        </p>
      </div>
      {absence.tags.length > 0 && (
        <div className="mt-1 flex items-center gap-1 text-xs">
          <div>
            <span className="text-slate-500">Теги:</span>
          </div>
          <div className="flex gap-1">
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
