import { EntityActionDelete } from "./delete";
import { EntityActionInfo } from "./info";
import { EntityActionUpdate } from "./update";

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
};

export function EntityActions<T extends EntityActionProps>({
  entity,
  onUpdate,
  onDelete,
}: Props<T>) {
  return (
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
      <EntityActionInfo entity={entity} />
      {onUpdate && <EntityActionUpdate onUpdate={onUpdate} />}
      {onDelete && <EntityActionDelete onDelete={onDelete} />}
    </div>
  );
}
