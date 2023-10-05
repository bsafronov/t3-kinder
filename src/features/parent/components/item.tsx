import { parentRoles } from "~/shared/consts/parent-roles";
import { Badge } from "~/shared/ui/badge";
import { type RouterOutputs } from "~/shared/utils/api";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { ModalEnum } from "~/features/_core/modal";

import { EntityActions } from "~/shared/components/entity-actions";
import { parentAPI } from "..";

type Props = RouterOutputs["parents"]["getManyByKid"][number];
export function ParentItem(parent: Props) {
  const { pushQuery } = useQueryString();
  const { mutate: deleteParent } = parentAPI.useDelete();

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
        <EntityActions
          entity={parent}
          onUpdate={() =>
            pushQuery({ modal: ModalEnum.PARENT_EDIT, parentId: parent.id })
          }
          onDelete={() => deleteParent({ parentId: parent.id })}
        />
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
