import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { type RouterOutputs } from "~/shared/utils/api";

const formSchema = z.object({
  label: z.string().min(1, { message: "Обязательное поле" }),
});

export type AbsenceTagSchemaType = z.infer<typeof formSchema>;
export type AbsenceTagFormType = UseFormReturn<AbsenceTagSchemaType>;

type Props = RouterOutputs["absenceTags"]["getManyByGroup"][number];

export function useAbsenceTagForm(absenceTag?: Props) {
  const form = useForm<AbsenceTagSchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      label: absenceTag?.label ?? "",
    },
  });

  return { form };
}
