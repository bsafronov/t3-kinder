import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { ModalEnum } from "~/features/_core/modal/query.types";
import { VaccinationItem } from "~/features/vaccination";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { api } from "~/shared/utils/api";

export function KidVaccinations() {
  const kidId = useRouter().query.kidId as string;
  const { pushQuery } = useQueryString();
  const { data: kidVaccinations, isSuccess } =
    api.vaccinations.getAllByKid.useQuery(
      {
        kidId,
      },
      {
        enabled: !!kidId,
      },
    );

  return (
    <Card className="overflow-hidden">
      {isSuccess && kidVaccinations.length === 0 && (
        <div className="border-b px-4 py-1 text-sm text-slate-500">
          У ребёнка пока не указаны прививки
        </div>
      )}
      {isSuccess && kidVaccinations.length > 0 && (
        <ul className="divide-y border-b">
          {kidVaccinations.map((vaccination) => (
            <li key={vaccination.id}>
              <VaccinationItem {...vaccination} />
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-end px-4 py-2">
        <Button
          variant={"link"}
          size={"contents"}
          onClick={() => pushQuery({ modal: ModalEnum.VACCINATION_CREATE })}
        >
          <Plus className="h-3 w-3" />
          Добавить прививку
        </Button>
      </div>
    </Card>
  );
}
