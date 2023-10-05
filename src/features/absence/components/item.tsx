import { format, formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { EditIcon, Info, Trash2 } from "lucide-react";
import { ModalEnum } from "~/features/_core/modal";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Badge } from "~/shared/ui/badge";
import { Confirm } from "~/shared/ui/confirm";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/shared/ui/hover-card";
import { type RouterOutputs } from "~/shared/utils/api";
import { useAbsenceDelete } from "../api/delete";

type Props = RouterOutputs["absences"]["getManyByKid"][number];
export function AbsenceItem(absence: Props) {
  const { pushQuery } = useQueryString();
  const isUpdated =
    absence.updatedAt.toString() !== absence.createdAt.toString();
  const isUpdatedByAnotherUser =
    absence.updatedById && absence.updatedById !== absence.createdById;

  const { mutate: deleteAbsence } = useAbsenceDelete();

  return (
    <div className="group px-4 py-2">
      <div className="flex justify-between">
        <div className="mb-1 flex">
          <Badge>{format(new Date(absence.date), "dd.MM.yyyy")}</Badge>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button>
                <Info className="h-4 w-4 text-slate-300 hover:text-slate-400" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-col text-xs">
                <div>
                  <span className="font-semibold">Создано: </span>
                  <span>
                    {formatRelative(new Date(absence.createdAt), new Date(), {
                      locale: ru,
                    })}
                  </span>
                </div>
                {(isUpdated || isUpdatedByAnotherUser) && (
                  <div>
                    <span className="font-semibold">Изменено: </span>
                    <span>
                      {formatRelative(new Date(absence.updatedAt), new Date(), {
                        locale: ru,
                      })}
                    </span>
                  </div>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
          <button
            onClick={() =>
              pushQuery({
                modal: ModalEnum.ABSENCE_EDIT,
                absenceId: absence.id,
              })
            }
          >
            <EditIcon className="h-4 w-4 text-blue-500 hover:text-blue-600" />
          </button>
          <Confirm
            variant="destructive"
            onConfirm={() => deleteAbsence({ absenceId: absence.id })}
          >
            <button>
              <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
            </button>
          </Confirm>
        </div>
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
              <Badge key={tag.id}>{tag.label}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
