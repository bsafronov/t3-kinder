import { useRouter } from "next/router";
import { useParentCreate } from "../api/create";
import { type ParentSchemaType, useParentForm } from "../form/use-form";
import { ParentFormFields } from "../form";
import { FormWrapper } from "~/shared/components/form-wrapper";

type Props = {
  backOnSuccess?: boolean;
};

export function ParentCreate({ backOnSuccess }: Props) {
  const router = useRouter();
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;

  const { form } = useParentForm();
  const phoneNumbers = form.watch("phoneNumbers");

  const { mutateAsync: create } = useParentCreate();

  const onSubmit = async (values: ParentSchemaType) => {
    try {
      const filteredPhoneNumbers = phoneNumbers.filter((phone) => phone !== "");
      await create({
        ...values,
        groupId,
        kidIDs: [kidId],
        phoneNumbers: filteredPhoneNumbers,
      });
      backOnSuccess && void router.back();
    } catch (e) {}
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <ParentFormFields {...form} />
    </FormWrapper>
  );
}
