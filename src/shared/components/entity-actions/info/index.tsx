import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/shared/ui/hover-card";
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
      </HoverCardContent>
    </HoverCard>
  );
}
