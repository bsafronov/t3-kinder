import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function KidFormFieldAdress(form: KidFormType) {
  return (
    <FormField
      control={form.control}
      name="adress"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Домашний адрес</FormLabel>
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
