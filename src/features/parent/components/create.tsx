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

  const { mutate: create } = useParentCreate();

  const onSubmit = (values: ParentSchemaType) => {
    const filteredPhoneNumbers = phoneNumbers.filter((phone) => phone !== "");
    create({
      ...values,
      groupId,
      kidIDs: [kidId],
      phoneNumbers: filteredPhoneNumbers,
    });
    backOnSuccess && void router.back();
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <ParentFormFields {...form} />
    </FormWrapper>
  );
}
