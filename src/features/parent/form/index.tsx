import type { ParentFormType } from "./use-form";
import { ParentFormFieldRole } from "./parts/role";
import { ParentFormFieldLastName } from "./parts/last-name";
import { ParentFormFieldFirstName } from "./parts/first-name";
import { ParentFormFieldMiddleName } from "./parts/middle-name";
import { ParentFormFieldPhoneNumbers } from "./parts/phone-numbers";

export function ParentFormFields(form: ParentFormType) {
  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        <ParentFormFieldRole {...form} />
        <ParentFormFieldLastName {...form} />
        <ParentFormFieldFirstName {...form} />
        <ParentFormFieldMiddleName {...form} />
        <ParentFormFieldPhoneNumbers {...form} />
      </div>
    </>
  );
}
