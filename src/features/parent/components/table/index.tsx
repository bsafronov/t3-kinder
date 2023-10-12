import { Loader2 } from "lucide-react";
import { parentAPI } from "../..";
import { DataTable } from "~/shared/components/table";
import { parentColumns } from "./columns";
import { useState } from "react";
import { useQueryString } from "~/shared/hooks/use-query-string";
import { Button } from "~/shared/ui/button";
import { useRouter } from "next/router";

export function ParentTable() {
  const pageNumber = useRouter().query.page as string | undefined;

  const [page, setPage] = useState<number>(pageNumber ? Number(pageNumber) : 1);
  const { pushQuery } = useQueryString();
  const { data, isLoading } = parentAPI.useGetManyByGroup({ page });

  const canNextPage = data && data.count > page * 20;

  const handleSetNextPage = () => {
    if (!data) return;
    if (!canNextPage) return;
    setPage(page + 1);
    pushQuery({ page: String(page + 1) });
  };

  const handleSetPrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
    pushQuery({ page: String(page - 1) });
  };

  return (
    <div>
      {data && <DataTable columns={parentColumns} data={data.parents} />}
      {isLoading && (
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      )}
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={handleSetPrevPage}
          disabled={page === 1}
        >
          Назад
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={handleSetNextPage}
          disabled={!canNextPage}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
