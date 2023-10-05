import { useRouter } from "next/router";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { badgeVariants } from "~/shared/ui/badge";
import { useAbsenceTagForm, type AbsenceTagSchemaType } from "../form/use-form";
import { AbsenceTagFormFields } from "../form";
import { useAbsenceTagGetManyByGroup } from "../api/get-many-by-group";
import { useAbsenceTagCreate } from "../api/create";

export function AbsenceTagCreate() {
  const groupId = useRouter().query.groupId as string;
  const { form } = useAbsenceTagForm();

  const { data: absenceTags } = useAbsenceTagGetManyByGroup();
  const { mutateAsync: create } = useAbsenceTagCreate();

  const onSubmit = async (values: AbsenceTagSchemaType) => {
    try {
      await create({ groupId, label: values.label });
      form.reset();
    } catch (e) {}
  };

  return (
    <>
      <ul className="mb-4 flex flex-wrap gap-2">
        {absenceTags?.map((tag) => (
          <li key={tag.id} className={badgeVariants()}>
            {tag.label}
          </li>
        ))}
      </ul>
      <FormWrapper form={form} onSubmit={onSubmit} cancelText="Назад">
        <AbsenceTagFormFields {...form} />
      </FormWrapper>
    </>
  );
}
