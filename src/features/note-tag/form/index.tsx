import { NoteTagFormFieldLabel } from "./parts/label";
import type { NoteTagFormType } from "./use-form";

export function NoteTagFormFields(form: NoteTagFormType) {
  return (
    <>
      <NoteTagFormFieldLabel {...form} />
    </>
  );
}
