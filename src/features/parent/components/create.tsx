import { useRouter } from "next/router";
import { type ParentSchemaType, useParentForm } from "../form/use-form";
import { ParentFormFields } from "../form";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { parentAPI } from "..";
import { Button } from "~/shared/ui/button";
import { useQueryString } from "~/shared/hooks/use-query-string";
import { ModalEnum } from "~/features/_core/modal";

type Props = {
  backOnSuccess?: boolean;
};

export function ParentCreate({ backOnSuccess }: Props) {
  const router = useRouter();
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;
  const { pushQuery } = useQueryString();

  const { form } = useParentForm();
  const phoneNumbers = form.watch("phoneNumbers");

  const { mutateAsync: create } = parentAPI.useCreate();

  const onSubmit = async (values: ParentSchemaType) => {
    try {
      const filteredPhoneNumbers = phoneNumbers.filter((phone) => phone !== "");
      await create({
        ...values,
        groupId,
        kidIDs: [kidId],
        phoneNumbers: filteredPhoneNumbers,
      });
      backOnSuccess && void router.back();
    } catch (e) {}
  };

  return (
    <>
      <FormWrapper form={form} onSubmit={onSubmit}>
        <ParentFormFields {...form} />
      </FormWrapper>
      <div className="mt-8 text-center text-sm">
        <span className="text-slate-500">Родитель уже записан? </span>
        <Button
          variant={"link"}
          size={"contents"}
          onClick={() => pushQuery({ modal: ModalEnum.PARENT_SELECT })}
        >
          Выберите из списка
        </Button>
      </div>
    </>
  );
}
