import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { parentRoles } from "~/shared/consts/parent-roles";
import { Button } from "~/shared/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import { api, type RouterOutputs } from "~/shared/utils/api";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Обязательное поле" }),
  lastName: z.string().min(1, { message: "Обязательное поле" }),
  middleName: z.string().min(1, { message: "Обязательное поле" }),
  role: z.string().min(1, { message: "Обязательное поле" }),
  phoneNumbers: z.array(z.string()),
});

type SchemaType = z.infer<typeof formSchema>;
type Props = {
  parent: RouterOutputs["parents"]["getAll"][number];
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditParentForm({ parent, setEditing }: Props) {
  const ctx = api.useContext();
  const { mutate: update } = api.parents.update.useMutation({
    onSuccess: () => {
      void ctx.parents.getAll.invalidate();
      setEditing(false);
    },
  });
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: parent.firstName ?? "",
      lastName: parent.lastName ?? "",
      middleName: parent.middleName ?? "",
      role: parent.role ?? "",
      phoneNumbers: parent.phoneNumbers,
    },
  });
  const phoneNumbers = form.watch("phoneNumbers");

  const onSubmit = (values: SchemaType) => {
    const filteredPhoneNumbers = phoneNumbers.filter((phone) => phone !== "");

    update({
      ...values,
      parentId: parent.id,
      phoneNumbers: filteredPhoneNumbers,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Роль</FormLabel>
                <select
                  {...field}
                  className="h-10 w-full rounded-md border bg-transparent px-2"
                >
                  {parentRoles.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отчество</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
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
                onClick={() =>
                  form.setValue("phoneNumbers", [...phoneNumbers, ""])
                }
              >
                <Plus className="h-3 w-3" />
                Добавить телефон
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => setEditing(false)}
          >
            Отмена
          </Button>
          <Button>Сохранить</Button>
        </div>
      </form>
    </Form>
  );
}
