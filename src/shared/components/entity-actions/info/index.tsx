import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { type EntityActionProps } from "..";

type Props<T extends EntityActionProps> = {
  entity: T;
};
export function EntityActionInfo<T extends EntityActionProps>({
  entity,
}: Props<T>) {
  const isUpdated = entity.updatedAt.toString() !== entity.createdAt.toString();
  const isUpdatedByAnotherUser =
    entity.updatedById && entity.updatedById !== entity.createdById;

  return (
    <div className="flex flex-col p-2 text-xs text-slate-500">
      <div>
        <span className="font-semibold">Создано: </span>
        <span>
          {formatRelative(new Date(entity.createdAt), new Date(), {
            locale: ru,
          })}
        </span>
      </div>
      {(isUpdated || isUpdatedByAnotherUser) && (
        <div>
          <span className="font-semibold">Изменено: </span>
          <span>
            {formatRelative(new Date(entity.updatedAt), new Date(), {
              locale: ru,
            })}
          </span>
        </div>
      )}
    </div>
    //   </HoverCardContent>
    // </HoverCard>
  );
}
