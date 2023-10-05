import { AbsenceFormFieldDate } from "./parts/date";
import { AbsenceFormFieldReason } from "./parts/reason";
import { AbsenceFormFieldTags } from "./parts/tags";
import { type AbsenceFormType } from "./use-form";

export function AbsenceFormFields(form: AbsenceFormType) {
  return (
    <>
      <AbsenceFormFieldDate {...form} />
      <AbsenceFormFieldReason {...form} />
      <AbsenceFormFieldTags {...form} />
    </>
  );
}
