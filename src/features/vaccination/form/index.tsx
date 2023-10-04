import { Button } from "~/shared/ui/button";
import type { VaccinationFormType } from "./use-form";
import { Plus } from "lucide-react";
import { VaccinationFormFieldVaccinationTag } from "./parts/vaccination-tag";
import { VaccinationFormFieldDate } from "./parts/date";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { ModalEnum } from "~/features/_core/modal";

export function VaccinationFormFields(form: VaccinationFormType) {
  const { pushQuery } = useQueryString();

  return (
    <>
      <VaccinationFormFieldDate {...form} />
      <VaccinationFormFieldVaccinationTag {...form} />
      <Button
        variant={"link"}
        size={"contents"}
        type="button"
        onClick={() => pushQuery({ modal: ModalEnum.VACCINATION_TAG_CREATE })}
      >
        <Plus className="h-3 w-3" />
        Добавить названия
      </Button>
    </>
  );
}
