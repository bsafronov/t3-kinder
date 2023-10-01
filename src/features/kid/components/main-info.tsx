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
import { api } from "~/shared/utils/api";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  adress: z.string(),
  omsPolicy: z.string(),
  birthDate: z.string(),
});

type SchemaType = z.infer<typeof formSchema>;

export function KidMainInfo() {
  const kidId = useRouter().query.kidId as string;
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      adress: "",
      birthDate: "",
      omsPolicy: "",
    },
  });

  const { mutate: update } = api.kids.update.useMutation();

  const { isLoading, isSuccess } = api.kids.getById.useQuery(
    { id: kidId },
    {
      onSuccess: (kid) => {
        if (!kid) return;
        form.setValue("firstName", kid.firstName);
        form.setValue("lastName", kid.lastName);
        form.setValue("middleName", kid.middleName);
        form.setValue("adress", kid.adress ?? "");
        form.setValue("birthDate", kid.birthDate ?? "");
        form.setValue("omsPolicy", kid.omsPolicy ?? "");
      },
      enabled: !!kidId,
    },
  );

  const onSubmit = (values: SchemaType) => {
    update({ ...values, kidId });
  };

  if (isLoading || !isSuccess)
    return (
      <Card className="flex items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </Card>
    );
  return (
    <Card className="w-full p-4">
      <Form {...form}>
        <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата рождения</FormLabel>
                  <Input {...field} type="date" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Домашний адрес</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="omsPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Полис ОМС</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button>Сохранить</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
