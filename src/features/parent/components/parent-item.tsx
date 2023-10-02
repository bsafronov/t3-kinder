import { EditIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { parentRoles } from "~/shared/consts/parent-roles";
import { Badge } from "~/shared/ui/badge";
import { type RouterOutputs } from "~/shared/utils/api";
import { EditParentForm } from "./edit-parent-form";

type Props = RouterOutputs["parents"]["getAll"][number];
export function ParentItem(parent: Props) {
  const [isEditing, setEditing] = useState(false);

  if (!isEditing) {
    return (
      <div className="group flex justify-between px-4 py-2 text-sm hover:bg-slate-50">
        <div className="flex items-center gap-2">
          <Badge>
            {parentRoles.find((r) => r.value === parent.role)?.label}
          </Badge>
          <span>
            {parent.lastName} {parent.firstName} {parent.middleName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="opacity-0 group-hover:opacity-100">
            <EditIcon
              className="h-4 w-4 text-slate-500 hover:text-slate-600"
              onClick={() => setEditing(true)}
            />
          </button>
          <button className="opacity-0 group-hover:opacity-100">
            <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <EditParentForm parent={parent} setEditing={setEditing} />
    </div>
  );
}
