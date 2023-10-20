import { format } from "date-fns";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { ModalEnum } from "~/features/_core/modal";
import { EntityActions } from "~/shared/components/entity-actions";
import { Loader } from "~/shared/components/loader";
import { useQueryString } from "~/shared/hooks/use-query-string";
import { Badge } from "~/shared/ui/badge";
import { Button, buttonVariants } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { Input } from "~/shared/ui/input";
import { cn } from "~/shared/utils/cn";
import { absenceAPI } from "..";
import { absenceTagAPI } from "~/features/absence-tag";
import Link from "next/link";
import { utils } from "~/shared/utils";

export function AbsenceGroupScreen() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const search = useDebounce<string>(searchValue, 1000);
  const tagIDs = useDebounce<string[]>(selectedTags, 1000);

  const {
    data,
    fetchNextPage,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
  } = absenceAPI.useGetInfiniteByGroup({ search, tagIDs });

  const { mutate: deleteAbsence } = absenceAPI.useDelete();
  const { data: absenceTags, isLoading: isAbsenceTagsLoading } =
    absenceTagAPI.useGetManyByGroup();
  const { pushQuery } = useQueryString();

  const flatItems = useMemo(() => {
    if (!data) return [];
    return data?.pages.map(({ items }) => items).flat() || [];
  }, [data]);

  const handleToggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleClearTags = () => {
    if (selectedTags.length > 0) {
      setSelectedTags([]);
    }
  };

  return (
    <>
      <Input
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {!isAbsenceTagsLoading && absenceTags && absenceTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1">
          <Badge
            className={cn("cursor-pointer border-slate-300", {
              "border-emerald-300/50 bg-emerald-100/50 text-emerald-600":
                selectedTags.length === 0,
            })}
            onClick={handleClearTags}
          >
            Все
          </Badge>
          {absenceTags?.map((tag) => (
            <Badge
              key={tag.id}
              className={cn("cursor-pointer border-slate-300", {
                "border-amber-300/50 bg-amber-100/50 text-amber-600":
                  selectedTags.includes(tag.id),
              })}
              onClick={() => handleToggleTag(tag.id)}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      )}

      {isLoading && <Loader />}

      {data && (
        <ul className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {flatItems.map((absence) => (
            <li key={absence.id}>
              <Card className="flex h-full flex-col justify-between px-4 py-2">
                <div className="flex items-start justify-between">
                  <div className="grow gap-1 pb-3">
                    <Badge variant={"primary"}>
                      {format(new Date(absence.date), "dd.MM.yyyy")}
                    </Badge>
                    <p>
                      {absence.reason ? (
                        absence.reason
                      ) : (
                        <span className=" text-slate-300">
                          Причина не указана
                        </span>
                      )}
                    </p>
                  </div>
                  <EntityActions
                    entity={absence}
                    onDelete={() => deleteAbsence({ absenceId: absence.id })}
                    onUpdate={() =>
                      pushQuery({
                        modal: ModalEnum.ABSENCE_EDIT,
                        absenceId: absence.id,
                      })
                    }
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-slate-500">Ребёнок: </span>
                    <Link
                      href={`/dashboard/${absence.groupId}/kids/${absence.kidId}`}
                      className={buttonVariants({
                        variant: "link",
                        size: "contents",
                      })}
                    >
                      {utils.formatFio(absence.kid)}
                    </Link>
                  </div>
                  {absence.tags.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-slate-500">Теги: </span>
                      {absence.tags.map((tag) => (
                        <Badge key={tag.id} variant={"secondary"}>
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-300">Теги не указаны</span>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
      {isSuccess && flatItems.length === 0 && (
        <div className="text-center text-slate-500">Ничего не найдено</div>
      )}
      {isFetchingNextPage && <Loader />}
      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button onClick={() => void fetchNextPage()}>Загрузить ещё</Button>
        </div>
      )}
    </>
  );
}
