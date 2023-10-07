import { type NoteFormType } from "../use-form";
import { Button } from "~/shared/ui/button";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { ModalEnum } from "~/features/_core/modal";
import { Plus } from "lucide-react";
import { noteTagAPI } from "~/features/note-tag";
import { Label } from "~/shared/ui/label";
import { Badge } from "~/shared/ui/badge";

export function NoteFormFieldTags(form: NoteFormType) {
  const { pushQuery } = useQueryString();

  const tagIDs = form.watch("tagIDs");
  const { data: noteTags } = noteTagAPI.useGetManyByGroup();
  return (
    <div>
      {/* <FormField
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
      /> */}
      <Label>Теги</Label>
      <div className="flex flex-wrap gap-2 rounded-md border p-2">
        {noteTags?.map((tag) => (
          <label key={tag.id}>
            <input
              type="checkbox"
              checked={tagIDs.includes(tag.id)}
              onChange={(e) =>
                e.target.checked
                  ? form.setValue("tagIDs", [...tagIDs, tag.id])
                  : form.setValue(
                      "tagIDs",
                      tagIDs.filter((id) => id !== tag.id),
                    )
              }
              className="peer hidden"
            />
            <Badge className="cursor-pointer select-none hover:bg-slate-50 peer-checked:border-amber-100 peer-checked:bg-amber-100/20 peer-checked:text-amber-600">
              {tag.label}
            </Badge>
          </label>
        ))}
      </div>
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
