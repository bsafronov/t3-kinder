import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { ModalEnum } from "~/features/_core/modal";
import { parentAPI } from "~/features/parent";
import { EntityActions } from "~/shared/components/entity-actions";
import { Loader } from "~/shared/components/loader";
import { useQueryString } from "~/shared/hooks/use-query-string";
import { Badge } from "~/shared/ui/badge";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { Input } from "~/shared/ui/input";
import { utils } from "~/shared/utils";

export function ParentGroupScreen() {
  const [searchValue, setSearchValue] = useState<string>("");

  const search = useDebounce<string>(searchValue, 1000);

  const {
    data,
    fetchNextPage,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
  } = parentAPI.useGetInfiniteByGroup({ search });

  const { mutate: deleteParent } = parentAPI.useDelete();
  const { pushQuery } = useQueryString();

  const flatItems = useMemo(() => {
    if (!data) return [];
    return data?.pages.map(({ items }) => items).flat() || [];
  }, [data]);

  return (
    <>
      <Input
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {isLoading && <Loader />}

      {data && (
        <ul className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {flatItems.map((parent) => (
            <li key={parent.id}>
              <Card className="h-full px-4 py-2">
                <div className="flex items-start justify-between">
                  <div className="grow gap-1">
                    <Badge variant={"accent"}>
                      {utils.findRole(parent.role)}
                    </Badge>
                    <p className="border-slate-100">
                      {utils.formatFio(parent, { full: true })}
                    </p>
                  </div>
                  <EntityActions
                    entity={parent}
                    onDelete={() => deleteParent({ parentId: parent.id })}
                    onUpdate={() =>
                      pushQuery({
                        modal: ModalEnum.PARENT_EDIT,
                        parentId: parent.id,
                      })
                    }
                  />
                </div>
                <div className="mt-4">
                  {parent.phoneNumbers.length > 0 ? (
                    <div>
                      <span className="text-slate-500">Телефон: </span>
                      <span>{parent.phoneNumbers.join(", ")}</span>
                    </div>
                  ) : (
                    <span className="text-slate-300">Телефон не указан</span>
                  )}
                  {parent.kids.length > 0 && (
                    <div className="flex gap-1">
                      <span className="text-slate-500">Дети: </span>
                      <div>
                        {parent.kids.map((kid, index) => (
                          <Fragment key={kid.id}>
                            <Link
                              href={`/dashboard/${parent.groupId}/kids/${kid.id}`}
                              className="text-blue-600 hover:text-blue-500"
                            >
                              {utils.formatFio(kid)}
                            </Link>
                            {parent.kids.length !== index + 1 && (
                              <span className="text-slate-300"> | </span>
                            )}
                          </Fragment>
                        ))}
                      </div>
                    </div>
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
