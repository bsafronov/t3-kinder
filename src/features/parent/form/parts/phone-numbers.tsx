import { FormField, FormItem, FormLabel, FormMessage } from "~/shared/ui/form";
import { type ParentFormType } from "../use-form";
import { Input } from "~/shared/ui/input";
import { Plus, Trash2 } from "lucide-react";

export function ParentFormFieldPhoneNumbers(form: ParentFormType) {
  const phoneNumbers = form.watch("phoneNumbers");

  return (
    <div>
      <FormLabel>Телефоны</FormLabel>
      <ul className="space-y-2">
        {phoneNumbers.map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`phoneNumbers.${index}`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <Input {...field} />
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-600"
                    onClick={() =>
                      form.setValue(`phoneNumbers`, [
                        ...phoneNumbers.slice(0, index),
                        ...phoneNumbers.slice(index + 1),
                      ])
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </ul>
      <div className="mt-2">
        <button
          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600"
          type="button"
          onClick={() => form.setValue("phoneNumbers", [...phoneNumbers, ""])}
        >
          <Plus className="h-3 w-3" />
          Добавить телефон
        </button>
      </div>
    </div>
  );
}
