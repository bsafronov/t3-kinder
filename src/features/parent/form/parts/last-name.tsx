import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type ParentFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function ParentFormFieldLastName(form: ParentFormType) {
  return (
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Фамилия</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
