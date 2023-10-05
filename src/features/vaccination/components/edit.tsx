import { useRouter } from "next/router";
import { Form } from "~/shared/ui/form";
import { VaccinationFormFields } from "../form";
import {
  type VaccinationSchemaType,
  useVaccinationForm,
} from "../form/use-form";
import { Button } from "~/shared/ui/button";
import { vaccinationAPI } from "..";

export function VaccinationEdit() {
  const vaccinationId = useRouter().query.vaccinationId as string;

  const { data: vaccination } = vaccinationAPI.useGetOne();
  const { mutateAsync: update } = vaccinationAPI.useUpdate();

  const { form } = useVaccinationForm(vaccination);

  const onSubmit = async (values: VaccinationSchemaType) => {
    try {
      await update({ vaccinationId, ...values });
    } catch (e) {}
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <VaccinationFormFields {...form} />
        <div className="mt-4 flex justify-end">
          <Button>Изменить</Button>
        </div>
      </form>
    </Form>
  );
}
