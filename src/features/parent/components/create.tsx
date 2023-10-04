import { useRouter } from "next/router";

import { Form } from "~/shared/ui/form";
import { useParentCreate } from "../api/create";
import { type ParentSchemaType, useParentForm } from "../form/use-form";
import { ParentFormFields } from "../form";

export function ParentCreate() {
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;

  const { form } = useParentForm();
  const phoneNumbers = form.watch("phoneNumbers");

  const { mutate: create } = useParentCreate({ backOnSuccess: true });

  const onSubmit = (values: ParentSchemaType) => {
    const filteredPhoneNumbers = phoneNumbers.filter((phone) => phone !== "");
    create({
      ...values,
      groupId,
      kidIDs: [kidId],
      phoneNumbers: filteredPhoneNumbers,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <ParentFormFields form={form} phoneNumbers={phoneNumbers} />
      </form>
    </Form>
  );
}
