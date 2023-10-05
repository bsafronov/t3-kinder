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
import { useRouter } from "next/router";
import { kidAPI } from "~/features/kid";
const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
});

type SchemaType = z.infer<typeof formSchema>;

export default function CreateKidPage() {
  const router = useRouter();
  const { mutateAsync: create } = kidAPI.useCreate();
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
    },
  });

  const onSubmit = async (values: SchemaType) => {
    const groupId = router.query.groupId as string;

    try {
      const kid = await create({
        ...values,
        groupId,
      });
      void router.push(`/dashboard/${kid.groupId}/kids/${kid.id}`);
    } catch (e) {}
  };

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-4xl font-semibold">Добавление ребёнка</h1>
      <Card className="w-full p-4">
        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
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
            <div className="mt-4 flex justify-end">
              <Button>Создать</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
