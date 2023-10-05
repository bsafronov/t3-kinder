import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { type KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

type Props = {
  form: KidFormType;
  isLoading?: boolean;
};
export function KidFormFieldFirstName({ form, isLoading }: Props) {
  return (
    <FormField
      control={form.control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Имя</FormLabel>
          <Input {...field} isLoading={isLoading} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
