import { EntityActionDelete } from "./delete";
import { EntityActionInfo } from "./info";
import { EntityActionUpdate } from "./update";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/popover";
import { MoreHorizontal } from "lucide-react";

export type EntityActionProps = {
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  updatedById: string | null;
};

type Props<T extends EntityActionProps> = {
  entity: T;
  onUpdate?: () => void;
  onDelete?: () => void;
  isAlwaysVisible?: boolean;
};

export function EntityActions<T extends EntityActionProps>({
  entity,
  onUpdate,
  onDelete,
}: Props<T>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-center text-slate-500 hover:text-slate-600">
          <MoreHorizontal className="h-4 w-4 " />
        </button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="w-max overflow-hidden px-0 py-2">
        <div className="flex flex-col divide-y border-y bg-white">
          {onUpdate && <EntityActionUpdate onUpdate={onUpdate} />}
          {onDelete && <EntityActionDelete onDelete={onDelete} />}
          <EntityActionInfo entity={entity} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
