import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
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
import { api } from "~/shared/utils/api";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Обязательное поле" }),
  lastName: z.string().min(1, { message: "Обязательное поле" }),
  middleName: z.string().min(1, { message: "Обязательное поле" }),
  role: z.string().min(1, { message: "Обязательное поле" }),
  phoneNumbers: z.array(z.string()),
});

type SchemaType = z.infer<typeof formSchema>;

export function AddParentForm() {
  const groupId = useRouter().query.groupId;
  const kidId = useRouter().query.kidId;
  const [isOpen, setOpen] = useState(false);

  const ctx = api.useContext();
  const { mutate: create } = api.parents.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      form.reset();
      void ctx.parents.getAll.invalidate();
    },
  });

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      role: "",
      phoneNumbers: [""],
    },
  });
  const phoneNumbers = form.watch("phoneNumbers");
  const onSubmit = (values: SchemaType) => {
    if (!kidId || !groupId || Array.isArray(kidId) || Array.isArray(groupId))
      return;

    const filteredPhoneNumbers = phoneNumbers.filter((phone) => phone !== "");
    create({
      ...values,
      groupId,
      kidIDs: [kidId],
      phoneNumbers: filteredPhoneNumbers,
    });
  };

  const handleCancelCreate = () => {
    setOpen(false);
    form.reset();
  };

  if (!isOpen) {
    return (
      <div className="flex justify-end p-4">
        <Button onClick={() => setOpen(true)} variant={"outline"}>
          Добавить родителя
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        className="p-4"
      >
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Роль</FormLabel>
                <select
                  {...field}
                  className="block h-10 w-full rounded-md border bg-transparent px-2 text-sm"
                >
                  {parentRoles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
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
          <Button type="button" variant={"ghost"} onClick={handleCancelCreate}>
            Отмена
          </Button>
          <Button>Добавить</Button>
        </div>
      </form>
    </Form>
  );
}
