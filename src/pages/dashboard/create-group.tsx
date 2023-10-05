import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "~/shared/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import { Button } from "~/shared/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { groupAPI } from "~/features/group";
const formSchema = z.object({
  title: z.string().min(1, { message: "Обязательное поле" }),
});

type SchemaType = z.infer<typeof formSchema>;

export default function CreateGroupPage() {
  const user = useSession().data?.user;
  const router = useRouter();

  const { mutateAsync: create } = groupAPI.useCreate();
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: SchemaType) => {
    if (!user) return;

    try {
      const group = await create({ title: values.title });
      void router.push(`/dashboard/${group.id}`);
    } catch (e) {}
  };

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-4xl font-semibold">Создание новой группы</h1>
      <Card className="w-full p-4">
        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 flex justify-end">
              <Button>Создать</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
