import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { type RouterOutputs } from "~/shared/utils/api";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Обязательное поле" }),
  lastName: z.string().min(1, { message: "Обязательное поле" }),
  middleName: z.string().min(1, { message: "Обязательное поле" }),
  adress: z.string(),
  omsPolicy: z.string(),
  birthDate: z.string(),
});

export type KidSchemaType = z.infer<typeof formSchema>;
export type KidFormType = UseFormReturn<KidSchemaType>;

type Props = RouterOutputs["kids"]["getOne"];

export function useKidForm(kid?: Props) {
  const form = useForm<KidSchemaType>({
    resolver: zodResolver(formSchema),
    values: {
      firstName: kid?.firstName ?? "",
      lastName: kid?.lastName ?? "",
      middleName: kid?.middleName ?? "",
      adress: kid?.adress ?? "",
      omsPolicy: kid?.omsPolicy ?? "",
      birthDate: kid?.birthDate ?? "",
    },
  });

  return { form };
}
