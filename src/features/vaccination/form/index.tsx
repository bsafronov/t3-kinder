import type { VaccinationFormType } from "./use-form";
import { VaccinationFormFieldVaccinationTag } from "./parts/vaccination-tag";
import { VaccinationFormFieldDate } from "./parts/date";

export function VaccinationFormFields(form: VaccinationFormType) {
  return (
    <>
      <VaccinationFormFieldDate {...form} />
      <VaccinationFormFieldVaccinationTag {...form} />
    </>
  );
}
