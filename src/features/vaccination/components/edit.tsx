import { useRouter } from "next/router";
import { Form } from "~/shared/ui/form";
import { useVaccinationGetOne } from "../api/getOne";
import { useVaccinationUpdate } from "../api/update";
import { VaccinationFormFields } from "../form";
import {
  type VaccinationSchemaType,
  useVaccinationForm,
} from "../form/use-form";
import { Button } from "~/shared/ui/button";

export function VaccinationEdit() {
  const vaccinationId = useRouter().query.vaccinationId as string;

  const { data: vaccination } = useVaccinationGetOne();
  const { mutate: update } = useVaccinationUpdate();

  const { form } = useVaccinationForm(vaccination);

  const onSubmit = (values: VaccinationSchemaType) => {
    update({ vaccinationId, ...values });
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
