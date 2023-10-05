import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { type RouterOutputs } from "~/shared/utils/api";

const formSchema = z.object({
  description: z.string(),
  tagIDs: z.array(z.string()),
});

export type NoteSchemaType = z.infer<typeof formSchema>;
export type NoteFormType = UseFormReturn<NoteSchemaType>;

type Props = RouterOutputs["notes"]["getOne"];

export function useNoteForm(note?: Props) {
  const form = useForm<NoteSchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      description: note?.description ?? "",
      tagIDs: note?.tagIDs ?? [],
    },
  });

  return { form };
}
