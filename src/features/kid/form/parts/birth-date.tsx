import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function KidFormFieldBirthDate(form: KidFormType) {
  return (
    <FormField
      control={form.control}
      name="birthDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Дата рождения</FormLabel>
          <Input {...field} type="date" />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
