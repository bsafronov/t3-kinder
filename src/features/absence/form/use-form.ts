import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { type RouterOutputs } from "~/shared/utils/api";

const formSchema = z.object({
  date: z.string(),
  reason: z.string(),
  tagIDs: z.array(z.string()),
});

export type AbsenceSchemaType = z.infer<typeof formSchema>;
export type AbsenceFormType = UseFormReturn<AbsenceSchemaType>;

type Props = RouterOutputs["absences"]["getOne"];

export function useAbsenceForm(absence?: Props) {
  const form = useForm<AbsenceSchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      date: absence?.date ?? "",
      reason: absence?.reason ?? "",
      tagIDs: absence?.tagIDs ?? [],
    },
  });

  return { form };
}
