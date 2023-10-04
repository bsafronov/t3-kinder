import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { parentRoles } from "~/shared/consts/parent-roles";
import { Button } from "~/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import Select from "~/shared/ui/select";
import { api } from "~/shared/utils/api";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Обязательное поле" }),
  lastName: z.string().min(1, { message: "Обязательное поле" }),
  middleName: z.string().min(1, { message: "Обязательное поле" }),
  role: z.string().min(1, { message: "Обязательное поле" }),
  phoneNumbers: z.array(z.string()),
});

type SchemaType = z.infer<typeof formSchema>;

export function ParentCreate() {
  const groupId = useRouter().query.groupId;
  const kidId = useRouter().query.kidId;

  const ctx = api.useContext();
  const { mutate: create } = api.parents.create.useMutation({
    onSuccess: () => {
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
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => {
              const selectedValue = parentRoles.find(
                (p) => p.value === field.value,
              );

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
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
