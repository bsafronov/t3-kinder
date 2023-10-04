import { useRouter } from "next/router";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { badgeVariants } from "~/shared/ui/badge";
import {
  VaccinationTagSchemaType,
  useVaccinationTagForm,
} from "../form/use-form";
import { VaccinationTagFormFields } from "../form";
import { useVaccinationTagGetManyByGroup } from "../api/getManyByGroup";
import { useVaccinationTagCreate } from "../api/create";

export function VaccinationTagCreate() {
  const groupId = useRouter().query.groupId as string;
  const { form } = useVaccinationTagForm();

  const { data: vaccinationTags } = useVaccinationTagGetManyByGroup();
  const { mutate: create } = useVaccinationTagCreate();

  const onSubmit = (values: VaccinationTagSchemaType) => {
    create({ groupId, label: values.label });
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
