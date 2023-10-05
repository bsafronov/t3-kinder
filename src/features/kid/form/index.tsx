import { KidFormFieldAdress } from "./parts/adress";
import { KidFormFieldBirthDate } from "./parts/birth-date";
import { KidFormFieldFirstName } from "./parts/first-name";
import { KidFormFieldLastName } from "./parts/last-name";
import { KidFormFieldMiddleName } from "./parts/middle-name";
import { KidFormFieldOmsPolicy } from "./parts/oms-policy";
import { type KidFormType } from "./use-form";

export function KidFormFields(form: KidFormType) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <KidFormFieldLastName {...form} />
      <KidFormFieldFirstName {...form} />
      <KidFormFieldMiddleName {...form} />
      <KidFormFieldBirthDate {...form} />
      <KidFormFieldAdress {...form} />
      <KidFormFieldOmsPolicy {...form} />
    </div>
  );
}
