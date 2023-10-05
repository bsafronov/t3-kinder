import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { type KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

type Props = {
  form: KidFormType;
  isLoading?: boolean;
};
export function KidFormFieldLastName({ form, isLoading }: Props) {
  return (
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Фамилия</FormLabel>
          <Input {...field} isLoading={isLoading} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
