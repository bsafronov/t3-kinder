import { useRouter } from "next/router";
import { VaccinationFormFields } from "../form";
import {
  type VaccinationSchemaType,
  useVaccinationForm,
} from "../form/use-form";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { vaccinationAPI } from "..";

type Props = {
  backOnSuccess?: boolean;
};
export function VaccinationCreate({ backOnSuccess }: Props) {
  const router = useRouter();
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;
  const { form } = useVaccinationForm();

  const { mutateAsync: create } = vaccinationAPI.useCreate();

  const onSubmit = async (values: VaccinationSchemaType) => {
    try {
      await create({ kidId, groupId, date: values.date, tagId: values.tagId });
      backOnSuccess && void router.back();
    } catch (e) {}
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <VaccinationFormFields {...form} />
    </FormWrapper>
  );
}
