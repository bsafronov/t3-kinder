import { type ColumnDef } from "@tanstack/react-table";
import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "~/shared/ui/badge";
import { utils } from "~/shared/utils";
import { type RouterOutputs } from "~/shared/utils/api";

type Parent = Partial<RouterOutputs["notes"]["getManyByGroup"][number]>;

export const noteColumns: ColumnDef<Parent>[] = [
  {
    accessorKey: "description",
    header: "Описание",
    cell: (props) => {
      const row = props.row.original;

      return (
        <div className="flex flex-col gap-1">
          <p>{row.description}</p>
          <div className="flex gap-1">
            <span className="text-xs text-slate-500">Теги:</span>
            <div className="flex flex-wrap gap-1">
              {row.tags?.map((tag) => (
                <Badge key={tag.id} variant={"secondary"}>
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "kid",
    header: "Ребёнок",
    cell: (props) => {
      const row = props.row.original;

      return (
        <Link
          href={`/dashboard/${row.groupId}/kids/${row.kidId}`}
          className="text-xs text-blue-500"
        >
          {utils.formatFio(row.kid!)}
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата записи",
    cell: (props) => {
      const row = props.row.original;

      return (
        <span>
          {formatRelative(new Date(row.createdAt!), new Date(), { locale: ru })}
        </span>
      );
    },
  },
];
