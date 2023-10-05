import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function KidFormFieldMiddleName(form: KidFormType) {
  return (
    <FormField
      control={form.control}
      name="middleName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Отчество</FormLabel>
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
