import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { type RouterOutputs } from "~/shared/utils/api";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Обязательное поле" }),
  lastName: z.string().min(1, { message: "Обязательное поле" }),
  middleName: z.string().min(1, { message: "Обязательное поле" }),
  role: z.string().min(1, { message: "Обязательное поле" }),
  phoneNumbers: z.array(z.string()),
});

export type ParentSchemaType = z.infer<typeof formSchema>;
export type ParentFormType = UseFormReturn<ParentSchemaType>;

type Props = RouterOutputs["parents"]["getOne"];

export function useParentForm(parent?: Props) {
  const form = useForm<ParentSchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      firstName: parent?.firstName ?? "",
      lastName: parent?.lastName ?? "",
      middleName: parent?.middleName ?? "",
      phoneNumbers: parent?.phoneNumbers ?? [""],
      role: parent?.role ?? "",
    },
  });

  return { form };
}
