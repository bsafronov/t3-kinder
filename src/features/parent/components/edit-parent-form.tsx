import { zodResolver } from "@hookform/resolvers/zod";
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
    },
  });

  const onSubmit = (values: SchemaType) => {
    update({ parentId: parent.id, ...values });
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
