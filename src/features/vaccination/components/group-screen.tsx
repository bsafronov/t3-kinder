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
import { Heading } from "~/shared/ui/title";
import { cn } from "~/shared/utils/cn";
import { vaccinationAPI } from "..";
import { vaccinationTagAPI } from "~/features/vaccination-tag";
import Link from "next/link";
import { utils } from "~/shared/utils";

export function VaccinationGroupScreen() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tagIDs = useDebounce<string[]>(selectedTags, 1000);

  const {
    data,
    fetchNextPage,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
  } = vaccinationAPI.useGetInfiniteByGroup({ tagIDs });

  const { data: count } = vaccinationAPI.useGetCountByGroup();
  const { mutate: deleteVaccination } = vaccinationAPI.useDelete();
  const { data: vaccinationTags, isLoading: isAbsenceTagsLoading } =
    vaccinationTagAPI.useGetManyByGroup();
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
      <Heading title="Прививки" />
      <div className="flex justify-end">
        <span className="text-slate-500">Всего: {count}</span>
      </div>

      {!isAbsenceTagsLoading &&
        vaccinationTags &&
        vaccinationTags.length > 0 && (
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
            {vaccinationTags?.map((tag) => (
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
          {flatItems.map((vaccination) => (
            <li key={vaccination.id}>
              <Card className="flex h-full flex-col justify-between px-4 py-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex grow items-center gap-1 gap-2 pb-3">
                      <Badge variant={"primary"}>
                        {format(new Date(vaccination.date), "dd.MM.yyyy")}
                      </Badge>
                      <span>{vaccination.tag.label}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Ребёнок: </span>
                      <Link
                        href={`/dashboard/${vaccination.groupId}/kids/`}
                        className={buttonVariants({
                          size: "contents",
                          variant: "link",
                        })}
                      >
                        {utils.formatFio(vaccination.kid)}
                      </Link>
                    </div>
                  </div>
                  <EntityActions
                    entity={vaccination}
                    onDelete={() =>
                      deleteVaccination({ vaccinationId: vaccination.id })
                    }
                    onUpdate={() =>
                      pushQuery({
                        modal: ModalEnum.VACCINATION_EDIT,
                        absenceId: vaccination.id,
                      })
                    }
                  />
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
