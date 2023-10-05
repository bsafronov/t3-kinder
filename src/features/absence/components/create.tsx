import { useRouter } from "next/router";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { type AbsenceSchemaType, useAbsenceForm } from "../form/use-form";
import { useAbsenceCreate } from "../api/create";
import { AbsenceFormFields } from "../form";

type Props = {
  backOnSuccess?: boolean;
};

export function AbsenceCreate({ backOnSuccess }: Props) {
  const router = useRouter();
  const kidId = useRouter().query.kidId as string;
  const groupId = useRouter().query.groupId as string;

  const { form } = useAbsenceForm();
  const { mutate: create } = useAbsenceCreate();

  const onSubmit = (values: AbsenceSchemaType) => {
    create({
      ...values,
      kidId,
      groupId,
    });
    backOnSuccess && void router.back();
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <AbsenceFormFields {...form} />
    </FormWrapper>
  );
}
