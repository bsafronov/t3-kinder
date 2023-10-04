import { useRouter } from "next/router";
import { VaccinationFormFields } from "../form";
import {
  type VaccinationSchemaType,
  useVaccinationForm,
} from "../form/use-form";
import { useVaccinationCreate } from "../api/create";
import { FormWrapper } from "~/shared/components/form-wrapper";

export function VaccinationCreate() {
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;
  const { form } = useVaccinationForm();

  const { mutate: create } = useVaccinationCreate();

  const onSubmit = (values: VaccinationSchemaType) => {
    create({ kidId, groupId, date: values.date, tagId: values.tagId });
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <VaccinationFormFields {...form} />
    </FormWrapper>
  );
}
