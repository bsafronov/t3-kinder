import { format } from "date-fns";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { ModalEnum } from "~/features/_core/modal";
import { noteAPI } from "~/features/note";
import { noteTagAPI } from "~/features/note-tag";
import { EntityActions } from "~/shared/components/entity-actions";
import { Loader } from "~/shared/components/loader";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Badge } from "~/shared/ui/badge";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { Input } from "~/shared/ui/input";
import { Heading } from "~/shared/ui/title";
import { cn } from "~/shared/utils/cn";

export default function NotesPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const search = useDebounce<string>(searchValue, 1000);

  const {
    data,
    fetchNextPage,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
  } = noteAPI.useGetInfiniteByGroup({ search });

  const { data: count } = noteAPI.useGetCountByGroup();
  const { mutate: deleteParent } = noteAPI.useDelete();
  const { data: noteTags } = noteTagAPI.useGetManyByGroup();
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
    pushQuery({ tags: selectedTags });
  };

  const handleClearTags = () => {
    setSelectedTags([]);
    pushQuery({ tags: [] });
  };

  return (
    <>
      <Heading title="Примечания" />
      <div className="flex flex-col flex-col-reverse md:flex-row md:items-center md:justify-between">
        <div>
          <Input
            placeholder="Поиск..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <span className="text-slate-500">Всего: {count}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1">
        <Badge
          className={cn("border-slate-300", {
            "border-emerald-300/50 bg-emerald-100/50 text-emerald-600":
              selectedTags.length === 0,
          })}
          onClick={handleClearTags}
        >
          Все
        </Badge>
        {noteTags?.map((tag) => (
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

      {isLoading && <Loader />}

      {data && (
        <ul className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {flatItems.map((note) => (
            <li key={note.id}>
              <Card className="h-full px-4 py-2">
                <div className="flex items-start justify-between">
                  <div className="grow gap-1 pb-3">
                    <Badge variant={"primary"}>
                      {format(new Date(note.createdAt), "dd.MM.yyyy")}
                    </Badge>
                    <p>{note.description}</p>
                  </div>
                  <EntityActions
                    entity={note}
                    onDelete={() => deleteParent({ noteId: note.id })}
                    onUpdate={() =>
                      pushQuery({
                        modal: ModalEnum.NOTE_EDIT,
                        parentId: note.id,
                      })
                    }
                  />
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  {note.tags.map((tag) => (
                    <Badge key={tag.id} variant={"secondary"}>
                      {tag.label}
                    </Badge>
                  ))}
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
