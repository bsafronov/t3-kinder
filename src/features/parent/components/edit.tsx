import { useRouter } from "next/router";
import { ParentFormFields } from "../form";
import { type ParentSchemaType, useParentForm } from "../form/use-form";
import { useParentUpdate } from "../api/update";
import { useParentGetOne } from "../api/get-one";
import { FormWrapper } from "~/shared/components/form-wrapper";

type Props = {
  backOnSuccess?: boolean;
};

export function ParentEdit({ backOnSuccess }: Props) {
  const router = useRouter();
  const parentId = useRouter().query.parentId as string;

  const { data: parent } = useParentGetOne();
  const { mutate: update } = useParentUpdate();

  const { form } = useParentForm(parent);
  const phoneNumbers = form.watch("phoneNumbers");

  const onSubmit = (values: ParentSchemaType) => {
    const filteredPhoneNumbers = phoneNumbers.filter((phone) => phone !== "");

    update({
      ...values,
      parentId,
      phoneNumbers: filteredPhoneNumbers,
    });
    backOnSuccess && router.back();
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit} submitText="Создать">
      <ParentFormFields {...form} />
    </FormWrapper>
  );
}
