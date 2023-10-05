import { useRouter } from "next/router";
import { AbsenceFormFields } from "../form";
import { type AbsenceSchemaType, useAbsenceForm } from "../form/use-form";
import { FormWrapper } from "~/shared/components/form-wrapper";
import { absenceAPI } from "..";

type Props = {
  backOnSuccess?: boolean;
};

export function AbsenceUpdate({ backOnSuccess }: Props) {
  const router = useRouter();
  const absenceId = useRouter().query.absenceId as string;

  const { data: absence } = absenceAPI.useGetOne();
  const { mutateAsync: update } = absenceAPI.useUpdate();

  const { form } = useAbsenceForm(absence);

  const onSubmit = async (values: AbsenceSchemaType) => {
    try {
      await update({
        ...values,
        absenceId,
      });
      backOnSuccess && router.back();
    } catch (e) {}
  };

  return (
    <FormWrapper form={form} onSubmit={onSubmit} submitText="Изменить">
      <AbsenceFormFields {...form} />
    </FormWrapper>
  );
}
