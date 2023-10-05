import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { type RouterOutputs } from "~/shared/utils/api";

const formSchema = z.object({
  tagId: z.string().min(1, { message: "Обязательное поле" }),
  date: z.string().min(1, { message: "Обязательное поле" }),
});

export type VaccinationSchemaType = z.infer<typeof formSchema>;
export type VaccinationFormType = UseFormReturn<VaccinationSchemaType>;

type Props = RouterOutputs["vaccinations"]["getOne"];

export function useVaccinationForm(vaccination?: Props) {
  const form = useForm<VaccinationSchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      date: vaccination?.date ?? "",
      tagId: vaccination?.tagId ?? "",
    },
  });

  return { form };
}
