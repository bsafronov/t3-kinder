import { useRouter } from "next/router";
import { Button } from "~/shared/ui/button";
import type { ParentFormType } from "./use-form";
import { ParentFormFieldRole } from "./parts/role";
import { ParentFormFieldLastName } from "./parts/lastName";
import { ParentFormFieldFirstName } from "./parts/firstName";
import { ParentFormFieldMiddleName } from "./parts/middleName";
import { ParentFormFieldPhoneNumbers } from "./parts/phoneNumbers";

type Props = {
  form: ParentFormType;
  phoneNumbers: string[];
};

export function ParentFormFields({ form, phoneNumbers }: Props) {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        <ParentFormFieldRole {...form} />
        <ParentFormFieldLastName {...form} />
        <ParentFormFieldFirstName {...form} />
        <ParentFormFieldMiddleName {...form} />
        <ParentFormFieldPhoneNumbers form={form} phoneNumbers={phoneNumbers} />
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button type="button" variant={"ghost"} onClick={() => router.back()}>
          Отмена
        </Button>
        <Button>Добавить</Button>
      </div>
    </>
  );
}
