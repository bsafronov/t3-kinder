import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { type KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

type Props = {
  form: KidFormType;
  isLoading?: boolean;
};

export function KidFormFieldBirthDate({ form, isLoading }: Props) {
  return (
    <FormField
      control={form.control}
      name="birthDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Дата рождения</FormLabel>
          <Input {...field} type="date" isLoading={isLoading} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
