import { useRouter } from "next/router";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { badgeVariants } from "~/shared/ui/badge";
import {
  type VaccinationTagSchemaType,
  useVaccinationTagForm,
} from "../form/use-form";
import { VaccinationTagFormFields } from "../form";
import { vaccinationTagAPI } from "..";

export function VaccinationTagCreate() {
  const groupId = useRouter().query.groupId as string;
  const { form } = useVaccinationTagForm();

  const { data: vaccinationTags } = vaccinationTagAPI.useGetManyByGroup();
  const { mutateAsync: create } = vaccinationTagAPI.useCreate();

  const onSubmit = async (values: VaccinationTagSchemaType) => {
    try {
      await create({ groupId, label: values.label });
      form.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ul className="mb-4 flex flex-wrap gap-2">
        {vaccinationTags?.map((tag) => (
          <li key={tag.id} className={badgeVariants()}>
            {tag.label}
          </li>
        ))}
      </ul>
      <FormWrapper form={form} onSubmit={onSubmit} cancelText="Назад">
        <VaccinationTagFormFields {...form} />
      </FormWrapper>
    </>
  );
}
