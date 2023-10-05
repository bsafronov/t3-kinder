import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type AbsenceFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function AbsenceFormFieldDate(form: AbsenceFormType) {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Дата отсутствия</FormLabel>
          <FormControl>
            <Input {...field} type="date" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
