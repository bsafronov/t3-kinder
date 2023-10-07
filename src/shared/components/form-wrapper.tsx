import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => Promise<void>;
  children: React.ReactNode;
  noCancelButton?: boolean;
  cancelText?: "Отмена" | "Назад";
  submitText?: "Изменить" | "Создать";
};

export function FormWrapper<T extends FieldValues>({
  form,
  children,
  onSubmit,
  cancelText,
  submitText,
  noCancelButton,
}: Props<T>) {
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        className="space-y-2"
      >
        {children}
        <div className="mt-4 flex items-center justify-end gap-2">
          {!noCancelButton && (
            <Button
              onClick={() => router.back()}
              variant={"ghost"}
              type="button"
            >
              {cancelText ?? "Отмена"}
            </Button>
          )}
          <Button>{submitText ?? "Создать"}</Button>
        </div>
      </form>
    </Form>
  );
}
