import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { type KidFormType } from "../use-form";
import { Input } from "~/shared/ui/input";

type Props = {
  form: KidFormType;
  isLoading?: boolean;
};

export function KidFormFieldOmsPolicy({ form, isLoading }: Props) {
  return (
    <FormField
      control={form.control}
      name="omsPolicy"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Полис ОМС</FormLabel>
          <Input {...field} isLoading={isLoading} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
