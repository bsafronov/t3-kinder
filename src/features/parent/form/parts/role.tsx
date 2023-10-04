import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type ParentFormType } from "../use-form";
import { parentRoles } from "~/shared/consts/parent-roles";
import Select from "~/shared/ui/select";

export function ParentFormFieldRole(form: ParentFormType) {
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => {
        const selectedValue = parentRoles.find((p) => p.value === field.value);

        return (
          <FormItem>
            <FormLabel>Роль</FormLabel>
            <FormControl>
              <Select
                selectType="sync"
                value={selectedValue}
                options={parentRoles}
                onChange={(option) => field.onChange(option?.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
