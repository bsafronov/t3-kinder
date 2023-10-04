import { useRouter } from "next/router";
import { Form } from "~/shared/ui/form";
import { ParentFormFields } from "../form";
import { type ParentSchemaType, useParentForm } from "../form/use-form";
import { useParentUpdate } from "../api/update";
import { useParentGetOne } from "../api/getOne";

export function ParentEdit() {
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
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <ParentFormFields form={form} phoneNumbers={phoneNumbers} />
      </form>
    </Form>
  );
}
