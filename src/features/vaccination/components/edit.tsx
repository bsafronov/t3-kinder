import { useRouter } from "next/router";
import { VaccinationFormFields } from "../form";
import {
  type VaccinationSchemaType,
  useVaccinationForm,
} from "../form/use-form";
import { vaccinationAPI } from "..";
import { FormWrapper } from "~/shared/components/form-wrapper";

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
    <FormWrapper form={form} onSubmit={onSubmit} submitText="Изменить">
      <VaccinationFormFields {...form} />
    </FormWrapper>
  );
}
