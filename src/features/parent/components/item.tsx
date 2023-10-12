import { parentRoles } from "~/shared/consts/parent-roles";
import { Badge } from "~/shared/ui/badge";
import { type RouterOutputs } from "~/shared/utils/api";
import { useQueryString } from "~/shared/hooks/use-query-string";
import { ModalEnum } from "~/features/_core/modal";

import { EntityActions } from "~/shared/components/entity-actions";
import { parentAPI } from "..";
import { EntityItem } from "~/shared/components/entity-item";

type Props = RouterOutputs["parents"]["getManyByKid"][number];
export function ParentItem(parent: Props) {
  const { pushQuery } = useQueryString();
  const { mutate: deleteParent } = parentAPI.useDelete();

  return (
    <>
      <EntityItem
        body={<Body {...parent} />}
        actions={
          <EntityActions
            entity={parent}
            onUpdate={() =>
              pushQuery({ modal: ModalEnum.PARENT_EDIT, parentId: parent.id })
            }
            onDelete={() => deleteParent({ parentId: parent.id })}
          />
        }
      />
    </>
  );
}

function Body(parent: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start md:flex-row md:gap-1">
        <Badge variant={"accent"}>
          {parentRoles.find((r) => r.value === parent.role)?.label}
        </Badge>
        <span>
          {parent.lastName} {parent.firstName} {parent.middleName}
        </span>
      </div>
      <div>
        {parent.phoneNumbers.length > 0 && (
          <ul className="text-slate-500">
            {parent.phoneNumbers.map((phone, i) => (
              <li key={i}>{phone}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
