import { zodResolver } from "@hookform/resolvers/zod";
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
    },
  });
  const onSubmit = (values: SchemaType) => {
    if (!kidId || !groupId || Array.isArray(kidId) || Array.isArray(groupId))
      return;

    create({ groupId, kidIDs: [kidId], ...values });
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
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
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
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>
          <Button>Добавить</Button>
        </div>
      </form>
    </Form>
  );
}
