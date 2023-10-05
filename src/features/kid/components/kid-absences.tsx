import { Plus } from "lucide-react";
import { ModalEnum } from "~/features/_core/modal/query.types";
import { absenceAPI } from "~/features/absence";
import { AbsenceItem } from "~/features/absence/components/item";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";

export function KidAbsences() {
  const { pushQuery } = useQueryString();
  const { data: absences, isSuccess } = absenceAPI.useGetManyByKid();

  return (
    <Card className="overflow-hidden">
      {isSuccess && absences.length === 0 && (
        <div className="border-b px-4 py-1 text-sm text-slate-500">
          У ребёнка пока не указаны дни отсутствия
        </div>
      )}
      {isSuccess && absences.length > 0 && (
        <ul className="divide-y border-b">
          {absences.map((absence) => (
            <li key={absence.id}>
              <AbsenceItem {...absence} />
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-end px-4 py-2">
        <Button
          variant={"link"}
          size={"contents"}
          onClick={() => pushQuery({ modal: ModalEnum.ABSENCE_CREATE })}
        >
          <Plus className="h-3 w-3" />
          Добавить день
        </Button>
      </div>
    </Card>
  );
}
