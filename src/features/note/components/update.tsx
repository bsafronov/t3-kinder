import { useRouter } from "next/router";
import { NoteFormFields } from "../form";
import { type NoteSchemaType, useNoteForm } from "../form/use-form";
import { useNoteUpdate } from "../api/update";

import { FormWrapper } from "~/shared/components/form-wrapper";
import { useNoteGetOne } from "../api/get-one";

type Props = {
  backOnSuccess?: boolean;
};

export function NoteUpdate({ backOnSuccess }: Props) {
  const router = useRouter();
  const noteId = useRouter().query.noteId as string;

  const { data: absence } = useNoteGetOne();
  const { mutateAsync: update } = useNoteUpdate();

  const { form } = useNoteForm(absence);

  const onSubmit = async (values: NoteSchemaType) => {
    try {
      await update({
        ...values,
        noteId,
      });
      backOnSuccess && router.back();
    } catch (e) {}
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit} submitText="Создать">
      <NoteFormFields {...form} />
    </FormWrapper>
  );
}
