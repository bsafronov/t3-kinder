import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type AbsenceFormType } from "../use-form";
import Select from "~/shared/ui/select";

export function AbsenceFormFieldTags(form: AbsenceFormType) {
  return (
    <FormField
      control={form.control}
      name="tagIDs"
      render={({}) => {
        return (
          <FormItem>
            <FormLabel>Теги</FormLabel>
            <FormControl>
              <Select selectType="sync" />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
