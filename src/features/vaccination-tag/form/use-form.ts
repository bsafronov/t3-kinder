import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { type RouterOutputs } from "~/shared/utils/api";

const formSchema = z.object({
  label: z.string().min(1, { message: "Обязательное поле" }),
});

export type VaccinationTagSchemaType = z.infer<typeof formSchema>;
export type VaccinationTagFormType = UseFormReturn<VaccinationTagSchemaType>;

type Props = RouterOutputs["vaccinationTags"]["getAllByGroup"][number];

export function useVaccinationTagForm(vaccination?: Props) {
  const form = useForm<VaccinationTagSchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      label: vaccination?.label ?? "",
    },
  });

  return { form };
}
