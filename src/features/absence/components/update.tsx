import { useRouter } from "next/router";
import { AbsenceFormFields } from "../form";
import { type AbsenceSchemaType, useAbsenceForm } from "../form/use-form";
import { useAbsenceUpdate } from "../api/update";
import { useAbsenceGetOne } from "../api/get-one";
import { FormWrapper } from "~/shared/components/form-wrapper";

type Props = {
  backOnSuccess?: boolean;
};

export function AbsenceUpdate({ backOnSuccess }: Props) {
  const router = useRouter();
  const absenceId = useRouter().query.absenceId as string;

  const { data: absence } = useAbsenceGetOne();
  const { mutate: update } = useAbsenceUpdate();

  const { form } = useAbsenceForm(absence);

  const onSubmit = (values: AbsenceSchemaType) => {
    update({
      ...values,
      absenceId,
    });
    backOnSuccess && router.back();
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit} submitText="Создать">
      <AbsenceFormFields {...form} />
    </FormWrapper>
  );
}
