import { KidFormFieldAdress } from "./parts/adress";
import { KidFormFieldBirthDate } from "./parts/birth-date";
import { KidFormFieldFirstName } from "./parts/first-name";
import { KidFormFieldLastName } from "./parts/last-name";
import { KidFormFieldMiddleName } from "./parts/middle-name";
import { KidFormFieldOmsPolicy } from "./parts/oms-policy";
import { type KidFormType } from "./use-form";

type Props = {
  form: KidFormType;
  isLoading?: boolean;
};

export function KidFormFields({ form, isLoading }: Props) {
  return (
    <>
      <KidFormFieldLastName form={form} isLoading={isLoading} />
      <KidFormFieldFirstName form={form} isLoading={isLoading} />
      <KidFormFieldMiddleName form={form} isLoading={isLoading} />
      <KidFormFieldBirthDate form={form} isLoading={isLoading} />
      <KidFormFieldAdress form={form} isLoading={isLoading} />
      <KidFormFieldOmsPolicy form={form} isLoading={isLoading} />
    </>
  );
}
