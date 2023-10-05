import { useRouter } from "next/router";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { type NoteSchemaType, useNoteForm } from "../form/use-form";
import { useNoteCreate } from "../api/create";
import { NoteFormFields } from "../form";

type Props = {
  backOnSuccess?: boolean;
};

export function NoteCreate({ backOnSuccess }: Props) {
  const router = useRouter();
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;

  const { form } = useNoteForm();
  const { mutateAsync: create } = useNoteCreate();

  const onSubmit = async (values: NoteSchemaType) => {
    try {
      await create({
        ...values,
        kidId,
        groupId,
      });
      backOnSuccess && void router.back();
    } catch (e) {}
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <NoteFormFields {...form} />
    </FormWrapper>
  );
}
