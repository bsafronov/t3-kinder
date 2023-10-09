import { type ColumnDef } from "@tanstack/react-table";
import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import { parentRoles } from "~/shared/consts/parent-roles";
import { Badge } from "~/shared/ui/badge";
import { utils } from "~/shared/utils";
import { type RouterOutputs } from "~/shared/utils/api";

type Parent = Partial<
  RouterOutputs["parents"]["getManyByGroup"]["parents"][number]
>;

export const parentColumns: ColumnDef<Parent>[] = [
  {
    accessorKey: "fio",
    header: "ФИО",
    cell: (props) => {
      const row = props.row.original;

      return (
        <div className="flex flex-col">
          <div>
            <Badge variant={"accent"}>
              {parentRoles.find((r) => r.value === row.role)?.label}
            </Badge>
          </div>
          {utils.formatFio(row, { full: true })}
        </div>
      );
    },
  },
  {
    accessorKey: "kids",
    header: "Дети",
    cell: (props) => {
      const row = props.row.original;

      return (
        <ul>
          {row.kids?.map((kid) => (
            <li key={kid.id}>
              <Link
                href={`/dashboard/${kid.groupId}/kids/${kid.id}`}
                className="text-blue-500"
              >
                {utils.formatFio(kid)}
              </Link>
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "phoneNumbers",
    header: "Телефоны",
    cell: (props) => {
      const row = props.row.original;

      return (
        <ul className="flex flex-col">
          {row.phoneNumbers?.map((phone) => <li key={phone}>{phone}</li>)}
        </ul>
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
