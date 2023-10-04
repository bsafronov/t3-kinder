import { VaccinationTagFormFieldLabel } from "./parts/label";
import type { VaccinationTagFormType } from "./use-form";

export function VaccinationTagFormFields(form: VaccinationTagFormType) {
  return (
    <>
      <VaccinationTagFormFieldLabel {...form} />
    </>
  );
}
