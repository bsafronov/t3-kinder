import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "~/shared/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import { Button } from "~/shared/ui/button";
import { api } from "~/shared/utils/api";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { kidAPI } from "..";
import { useKidForm } from "../form/use-form";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { KidFormFields } from "../form";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  adress: z.string(),
  omsPolicy: z.string(),
  birthDate: z.string(),
});

type SchemaType = z.infer<typeof formSchema>;

export function KidMainInfo() {
  const kidId = useRouter().query.kidId as string;
  const { mutateAsync: update } = kidAPI.useUpdate();
  const { data: kid, isLoading, isSuccess } = kidAPI.useGetOne();

  const { form } = useKidForm(kid);

  const onSubmit = async (values: SchemaType) => {
    try {
      await update({ ...values, kidId });
    } catch (e) {}
  };

  if (isLoading || !isSuccess)
    return (
      <Card className="flex items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </Card>
    );
  return (
    <Card className="w-full p-4">
      <FormWrapper
        form={form}
        onSubmit={onSubmit}
        cancelText="Назад"
        noCancelButton
        submitText="Изменить"
      >
        <KidFormFields {...form} />
      </FormWrapper>
    </Card>
  );
}
