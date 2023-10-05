import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type NoteTagFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function NoteTagFormFieldLabel(form: NoteTagFormType) {
  return (
    <FormField
      control={form.control}
      name="label"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Название</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
