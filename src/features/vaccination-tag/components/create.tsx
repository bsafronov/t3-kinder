import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { badgeVariants } from "~/shared/ui/badge";
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
  label: z.string().min(1, { message: "Обязательное поле" }),
});
type SchemaType = z.infer<typeof formSchema>;

export function VaccinationTagCreate() {
  const groupId = useRouter().query.groupId as string;
  const router = useRouter();
  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
    },
  });

  const ctx = api.useContext();

  const { data: vaccinationTags } = api.vaccinationTags.getAllByGroup.useQuery(
    { groupId },
    {
      enabled: !!groupId,
    },
  );

  const { mutate: create } = api.vaccinationTags.create.useMutation({
    onSuccess: () => {
      void ctx.vaccinationTags.getAllByGroup.invalidate();
      form.reset();
      toast.success("Название успешно добавлено!");
    },
    onError: () => {
      toast.error("Ой! Произошла ошибка.");
    },
  });

  const onSubmit = (values: SchemaType) => {
    create({ groupId, label: values.label });
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <ul className="mb-4 flex flex-wrap gap-2">
          {vaccinationTags?.map((tag) => (
            <li key={tag.id} className={badgeVariants()}>
              {tag.label}
            </li>
          ))}
        </ul>
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex justify-end gap-4">
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => void router.back()}
          >
            Назад
          </Button>
          <Button>Добавить</Button>
        </div>
      </form>
    </Form>
  );
}
