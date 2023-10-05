import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { type NoteFormType } from "../use-form";
import Select from "~/shared/ui/select";
import { Button } from "~/shared/ui/button";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { ModalEnum } from "~/features/_core/modal";
import { Plus } from "lucide-react";
import { useNoteTagGetManyByGroup } from "~/features/note-tag";

export function NoteFormFieldTags(form: NoteFormType) {
  const { pushQuery } = useQueryString();

  const { data: noteTags } = useNoteTagGetManyByGroup();
  return (
    <div>
      <FormField
        control={form.control}
        name="tagIDs"
        render={({ field }) => {
          const selectedTags = noteTags
            ?.filter((tag) => field.value.includes(tag.id))
            .map((tag) => ({ value: tag.id, label: tag.label }));

          const options = (noteTags ?? []).map((t) => ({
            value: t.id,
            label: t.label,
          }));

          return (
            <FormItem>
              <FormLabel>Теги</FormLabel>
              <FormControl>
                <Select
                  selectType="sync"
                  isMulti
                  value={selectedTags}
                  options={options}
                  onChange={(options) =>
                    field.onChange(options.map((o) => o.value))
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
        onClick={() => pushQuery({ modal: ModalEnum.NOTE_TAG_CREATE })}
      >
        <Plus className="h-3 w-3" />
        Добавить названия
      </Button>
    </div>
  );
}
