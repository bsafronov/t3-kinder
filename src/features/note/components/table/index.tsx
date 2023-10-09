import { DataTable } from "~/shared/components/table";
import { noteColumns } from "./columns";
import { noteAPI } from "../..";
import { LoadingCard } from "~/shared/components/loading-card";

export function NoteTable() {
  const { data, isLoading } = noteAPI.useGetManyByGroup();

  console.log(data);

  return (
    <>
      {isLoading && <LoadingCard />}
      {data && <DataTable columns={noteColumns} data={data} />}
    </>
  );
}
