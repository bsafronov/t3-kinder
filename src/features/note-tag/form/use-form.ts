import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { type RouterOutputs } from "~/shared/utils/api";

const formSchema = z.object({
  label: z.string().min(1, { message: "Обязательное поле" }),
});

export type NoteTagSchemaType = z.infer<typeof formSchema>;
export type NoteTagFormType = UseFormReturn<NoteTagSchemaType>;

type Props = RouterOutputs["noteTags"]["getManyByGroup"][number];

export function useAbsenceTagForm(noteTag?: Props) {
  const form = useForm<NoteTagSchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      label: noteTag?.label ?? "",
    },
  });

  return { form };
}
