import { useRouter } from "next/router";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { type AbsenceSchemaType, useAbsenceForm } from "../form/use-form";

import { AbsenceFormFields } from "../form";
import { absenceAPI } from "..";

type Props = {
  backOnSuccess?: boolean;
};

export function AbsenceCreate({ backOnSuccess }: Props) {
  const router = useRouter();
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;

  const { form } = useAbsenceForm();
  const { mutateAsync: create } = absenceAPI.useCreate();

  const onSubmit = async (values: AbsenceSchemaType) => {
    try {
      await create({
        ...values,
        kidId,
        groupId,
      });
      console.log(backOnSuccess);

      backOnSuccess && void router.back();
    } catch (e) {}
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <AbsenceFormFields {...form} />
    </FormWrapper>
  );
}
