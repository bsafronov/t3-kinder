import { EditIcon, Info, Trash2 } from "lucide-react";
import { parentRoles } from "~/shared/consts/parent-roles";
import { Badge } from "~/shared/ui/badge";
import { api, type RouterOutputs } from "~/shared/utils/api";
import { Confirm } from "~/shared/ui/confirm";
import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/shared/ui/hover-card";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { ModalEnum } from "~/features/_core/modal";

type Props = RouterOutputs["parents"]["getAll"][number];
export function ParentItem(parent: Props) {
  const { pushQuery } = useQueryString();
  const ctx = api.useContext();
  const isUpdated = parent.updatedAt.toString() !== parent.createdAt.toString();
  const isUpdatedByAnotherUser =
    parent.updatedById && parent.updatedById !== parent.createdById;
  const { mutate: deleteParent } = api.parents.delete.useMutation({
    onSuccess: () => {
      void ctx.parents.getAll.invalidate();
    },
  });

  return (
    <div className="group relative px-4 py-2 text-sm hover:bg-slate-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge>
            {parentRoles.find((r) => r.value === parent.role)?.label}
          </Badge>
          <span>
            {parent.lastName} {parent.firstName} {parent.middleName}
          </span>
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
                    {formatRelative(new Date(parent.createdAt), new Date(), {
                      locale: ru,
                    })}
                  </span>
                </div>
                {(isUpdated || isUpdatedByAnotherUser) && (
                  <div>
                    <span className="font-semibold">Изменено: </span>
                    <span>
                      {formatRelative(new Date(parent.updatedAt), new Date(), {
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
              pushQuery({ modal: ModalEnum.PARENT_EDIT, parentId: parent.id })
            }
          >
            <EditIcon className="h-4 w-4 text-blue-500 hover:text-blue-600" />
          </button>
          <Confirm
            variant="destructive"
            onConfirm={() => deleteParent({ parentId: parent.id })}
          >
            <button>
              <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
            </button>
          </Confirm>
        </div>
      </div>
      <div>
        {parent.phoneNumbers.length > 0 && (
          <ul className="mt-2 text-xs text-slate-500">
            {parent.phoneNumbers.map((phone, i) => (
              <li key={i}>{phone}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
