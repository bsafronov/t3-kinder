import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function KidFormFieldLastName(form: KidFormType) {
  return (
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Фамилия</FormLabel>
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
