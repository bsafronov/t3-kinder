import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Button } from "~/shared/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import Select from "~/shared/ui/select";
import { api } from "~/shared/utils/api";

const formSchema = z.object({
  tagId: z.string().min(1, { message: "Обязательное поле" }),
  date: z.string().min(1, { message: "Обязательное поле" }),
});

type SchemaType = z.infer<typeof formSchema>;

export function VaccinationCreate() {
  const { pushQuery } = useQueryString();
  const router = useRouter();
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      tagId: "",
    },
  });

  const { data: vaccinationTags } = api.vaccinationTags.getAllByGroup.useQuery(
    { groupId },
    {
      enabled: !!groupId,
    },
  );

  const ctx = api.useContext();

  const { mutate: create } = api.vaccinations.create.useMutation({
    onSuccess: () => {
      form.reset();
      void ctx.vaccinations.getAllByKid.invalidate({ kidId });
      toast.success("Прививка добавлена!");
      router.back();
    },
  });

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
              <Select
                value={vaccinationTags?.find((v) => v.groupId === field.value)}
                selectType="sync"
                options={vaccinationTags ?? []}
                onChange={(value) => field.onChange(value?.id ?? undefined)}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant={"link"}
          size={"contents"}
          type="button"
          onClick={() => pushQuery({ modal: "vaccination-tag-create" })}
        >
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
