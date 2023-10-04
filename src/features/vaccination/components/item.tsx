import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { ModalEnum } from "~/features/_core/modal";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Badge } from "~/shared/ui/badge";
import { Confirm } from "~/shared/ui/confirm";
import { type RouterOutputs } from "~/shared/utils/api";
import { useVaccinationDelete } from "../api/delete";

type Props = RouterOutputs["vaccinations"]["getAllByKid"][number];

export function VaccinationItem(vaccination: Props) {
  const { pushQuery } = useQueryString();
  const { mutate: deleteVaccination } = useVaccinationDelete();

  return (
    <div className="group flex items-center justify-between px-4 py-2 hover:bg-slate-50">
      <div className="flex items-center gap-1">
        <Badge variant={"default"}>
          {format(new Date(vaccination.date), "dd.MM.yyyy")}
        </Badge>
        <span className="text-sm">{vaccination.tag.label}</span>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100">
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() =>
            pushQuery({
              modal: ModalEnum.VACCINATION_EDIT,
              vaccinationId: vaccination.id,
            })
          }
        >
          <Edit className="h-4 w-4" />
        </button>
        <Confirm
          variant="destructive"
          onConfirm={() => deleteVaccination({ vaccinationId: vaccination.id })}
        >
          <button className="text-red-500 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </Confirm>
      </div>
    </div>
  );
}
