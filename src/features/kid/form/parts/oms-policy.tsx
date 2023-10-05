import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

export function KidFormFieldOmsPolicy(form: KidFormType) {
  return (
    <FormField
      control={form.control}
      name="omsPolicy"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Полис ОМС</FormLabel>
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
