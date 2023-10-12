import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type VaccinationFormType } from "../use-form";
import Select from "~/shared/ui/select";
import { Button } from "~/shared/ui/button";
import { Plus } from "lucide-react";
import { useQueryString } from "~/shared/hooks/use-query-string";
import { ModalEnum } from "~/features/_core/modal";
import { vaccinationTagAPI } from "~/features/vaccination-tag";

export function VaccinationFormFieldVaccinationTag(form: VaccinationFormType) {
  const { pushQuery } = useQueryString();

  const { data: vaccinationTags } = vaccinationTagAPI.useGetManyByGroup();

  return (
    <div>
      <FormField
        control={form.control}
        name="tagId"
        render={({ field }) => {
          const selectedTag = vaccinationTags?.find(
            (v) => v.id === field.value,
          );
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
      <Button
        variant={"link"}
        size={"contents"}
        type="button"
        onClick={() => pushQuery({ modal: ModalEnum.VACCINATION_TAG_CREATE })}
      >
        <Plus className="h-3 w-3" />
        Добавить названия
      </Button>
    </div>
  );
}
