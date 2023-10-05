import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type AbsenceFormType } from "../use-form";
import { Textarea } from "~/shared/ui/textarea";

export function AbsenceFormFieldReason(form: AbsenceFormType) {
  return (
    <FormField
      control={form.control}
      name="reason"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Причина</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
