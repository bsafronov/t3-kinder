import { z } from "zod";
import { useRouter } from "next/router";
import { kidAPI } from "..";
import { useKidForm } from "../form/use-form";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { KidFormFields } from "../form";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  adress: z.string(),
  omsPolicy: z.string(),
  birthDate: z.string(),
});

type SchemaType = z.infer<typeof formSchema>;

export function KidCreate() {
  const groupId = useRouter().query.groupId as string;
  const { mutateAsync: create } = kidAPI.useCreate();

  const { form } = useKidForm();
  const onSubmit = async (values: SchemaType) => {
    try {
      await create({ ...values, groupId });
    } catch (e) {}
  };

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      cancelText="Отмена"
      submitText="Создать"
    >
      <KidFormFields form={form} />
    </FormWrapper>
  );
}
