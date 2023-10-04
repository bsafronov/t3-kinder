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

export function VaccinationEdit() {
  const { pushQuery } = useQueryString();
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;
  const vaccinationId = useRouter().query.vaccinationId as string;
  const ctx = api.useContext();
  const { data: vaccination } = api.vaccinations.getOneByKid.useQuery(
    { vaccinationId },
    {
      enabled: !!vaccinationId,
    },
  );

  const { data: vaccinationTags } = api.vaccinationTags.getAllByGroup.useQuery(
    {
      groupId,
    },
    { enabled: !!groupId },
  );

  const { mutate: update } = api.vaccinations.update.useMutation({
    onSuccess: () => {
      void ctx.vaccinations.getAllByKid.invalidate({ kidId });
      toast.success("Прививка обновлена!");
    },
  });

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      date: vaccination?.date ?? "",
      tagId: vaccination?.tagId ?? "",
    },
  });

  const onSubmit = (values: SchemaType) => {
    update({ vaccinationId, ...values });
    pushQuery(null);
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
          render={({ field }) => {
            const selectedTag = vaccinationTags?.find(
              (v) => v.id === field.value,
            );
            const options = (vaccinationTags ?? []).map((t) => ({
              value: t.id,
              label: t.label,
            }));

            return (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <Select
                  value={
                    selectedTag
                      ? { value: selectedTag.id, label: selectedTag.label }
                      : null
                  }
                  selectType="sync"
                  placeholder="Выбрать..."
                  options={options}
                  onChange={(option) =>
                    field.onChange(option?.value ?? undefined)
                  }
                />
                <FormMessage />
              </FormItem>
            );
          }}
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
          <Button>Изменить</Button>
        </div>
      </form>
    </Form>
  );
}
