import { useRouter } from "next/router";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { badgeVariants } from "~/shared/ui/badge";
import { useAbsenceTagForm, type NoteTagSchemaType } from "../form/use-form";
import { NoteTagFormFields } from "../form";
import { noteTagAPI } from "..";

export function NoteTagCreate() {
  const groupId = useRouter().query.groupId as string;
  const { form } = useAbsenceTagForm();

  const { data: absenceTags } = noteTagAPI.useGetManyByGroup();
  const { mutateAsync: create } = noteTagAPI.useCreate();

  const onSubmit = async (values: NoteTagSchemaType) => {
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
        <NoteTagFormFields {...form} />
      </FormWrapper>
    </>
  );
}
