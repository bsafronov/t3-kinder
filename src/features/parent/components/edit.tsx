import { useRouter } from "next/router";
import { ParentFormFields } from "../form";
import { type ParentSchemaType, useParentForm } from "../form/use-form";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { parentAPI } from "..";

type Props = {
  backOnSuccess?: boolean;
};

export function ParentEdit({ backOnSuccess }: Props) {
  const router = useRouter();
  const parentId = useRouter().query.parentId as string;

  const { data: parent } = parentAPI.useGetOne();
  const { mutateAsync: update } = parentAPI.useUpdate();

  const { form } = useParentForm(parent);
  const phoneNumbers = form.watch("phoneNumbers");

  const onSubmit = async (values: ParentSchemaType) => {
    try {
      const filteredPhoneNumbers = phoneNumbers.filter((phone) => phone !== "");
      await update({
        ...values,
        parentId,
        phoneNumbers: filteredPhoneNumbers,
      });
      backOnSuccess && router.back();
    } catch (e) {}
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit} submitText="Изменить">
      <ParentFormFields {...form} />
    </FormWrapper>
  );
}
