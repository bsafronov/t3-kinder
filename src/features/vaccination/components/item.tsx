import { format } from "date-fns";
import { ModalEnum } from "~/features/_core/modal";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Badge } from "~/shared/ui/badge";
import { type RouterOutputs } from "~/shared/utils/api";
import { useVaccinationDelete } from "../api/delete";
import { EntityActions } from "~/shared/components/entity-actions";

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
      <EntityActions
        entity={vaccination}
        onDelete={() => deleteVaccination({ vaccinationId: vaccination.id })}
        onUpdate={() =>
          pushQuery({
            modal: ModalEnum.VACCINATION_EDIT,
            vaccinationId: vaccination.id,
          })
        }
      />
    </div>
  );
}
