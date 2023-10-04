import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type VaccinationFormType } from "../use-form";
import Select from "~/shared/ui/select";
import { useRouter } from "next/router";
import { api } from "~/shared/utils/api";

export function VaccinationFormFieldVaccinationTag(form: VaccinationFormType) {
  const groupId = useRouter().query.groupId as string;

  const { data: vaccinationTags } = api.vaccinationTags.getAllByGroup.useQuery(
    { groupId },
    {
      enabled: !!groupId,
    },
  );

  return (
    <FormField
      control={form.control}
      name="tagId"
      render={({ field }) => {
        const selectedTag = vaccinationTags?.find((v) => v.id === field.value);
        const options = (vaccinationTags ?? []).map((t) => ({
          value: t.id,
          label: t.label,
        }));

        return (
          <FormItem>
            <FormLabel>Прививка</FormLabel>
            <FormControl>
              <Select
                selectType="sync"
                value={
                  selectedTag
                    ? { value: selectedTag.id, label: selectedTag.label }
                    : null
                }
                options={options}
                onChange={(option) =>
                  field.onChange(option?.value ?? undefined)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
