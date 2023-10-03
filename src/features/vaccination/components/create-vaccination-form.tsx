import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  tagId: z.string().min(1, { message: "Обязательное поле" }),
  date: z.string().min(1, { message: "Обязательное поле" }),
});

type SchemaType = z.infer<typeof formSchema>;

export function CreateVaccinationForm() {
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      tagId: "",
    },
  });

  const { data: vaccinationTags } = api.vaccinationTags.getAll.useQuery(
    { groupId },
    {
      enabled: !!groupId,
    },
  );

  const { mutate: create } = api.vaccinations.create.useMutation({});

  const onSubmit = (values: SchemaType) => {
    create({ kidId, groupId, date: values.date, tagId: values.tagId });
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата прививки</FormLabel>
              <Input {...field} type="date" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <select {...field} disabled={vaccinationTags?.length === 0}>
                {vaccinationTags?.length === 0 && (
                  <option disabled selected>
                    Нет доступных прививок
                  </option>
                )}
                {vaccinationTags?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.label}
                  </option>
                ))}
              </select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"link"} size={"contents"} type="button">
          <Plus className="h-3 w-3" />
          Добавить названия
        </Button>
        <div className="mt-4 flex justify-end">
          <Button>Добавить</Button>
        </div>
      </form>
    </Form>
  );
}
