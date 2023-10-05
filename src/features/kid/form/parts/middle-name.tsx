import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { type KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

type Props = {
  form: KidFormType;
  isLoading?: boolean;
};
export function KidFormFieldMiddleName({ form, isLoading }: Props) {
  return (
    <FormField
      control={form.control}
      name="middleName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Отчество</FormLabel>
          <Input {...field} isLoading={isLoading} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
