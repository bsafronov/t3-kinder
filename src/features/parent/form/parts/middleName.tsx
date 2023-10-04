import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type ParentFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function ParentFormFieldMiddleName(form: ParentFormType) {
  return (
    <FormField
      control={form.control}
      name="middleName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Отчество</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
