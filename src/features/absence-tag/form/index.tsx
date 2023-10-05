import { AbsenceTagFormFieldLabel } from "./parts/label";
import type { AbsenceTagFormType } from "./use-form";

export function AbsenceTagFormFields(form: AbsenceTagFormType) {
  return (
    <>
      <AbsenceTagFormFieldLabel {...form} />
    </>
  );
}
