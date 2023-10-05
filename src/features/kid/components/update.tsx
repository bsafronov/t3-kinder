import { z } from "zod";
import { Card } from "~/shared/ui/card";
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

export function KidMainInfo() {
  const kidId = useRouter().query.kidId as string;
  const { mutateAsync: update } = kidAPI.useUpdate();
  const { data: kid, isLoading } = kidAPI.useGetOne();

  const { form } = useKidForm(kid);
  const onSubmit = async (values: SchemaType) => {
    try {
      await update({ ...values, kidId });
    } catch (e) {}
  };

  return (
    <Card className="w-full p-4">
      <FormWrapper
        form={form}
        onSubmit={onSubmit}
        cancelText="Назад"
        noCancelButton
        submitText="Изменить"
      >
        <KidFormFields form={form} isLoading={isLoading} />
      </FormWrapper>
    </Card>
  );
}
