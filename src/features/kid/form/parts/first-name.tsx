import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function KidFormFieldFirstName(form: KidFormType) {
  return (
    <FormField
      control={form.control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Имя</FormLabel>
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
