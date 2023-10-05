import { NoteFormFieldDescription } from "./parts/description";
import { NoteFormFieldTags } from "./parts/tags";
import { type NoteFormType } from "./use-form";

export function NoteFormFields(form: NoteFormType) {
  return (
    <>
      <NoteFormFieldDescription {...form} />
      <NoteFormFieldTags {...form} />
    </>
  );
}
