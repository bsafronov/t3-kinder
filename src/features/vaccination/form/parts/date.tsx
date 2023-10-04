import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type VaccinationFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function VaccinationFormFieldDate(form: VaccinationFormType) {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Дата прививки</FormLabel>
          <FormControl>
            <Input {...field} type="date" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
