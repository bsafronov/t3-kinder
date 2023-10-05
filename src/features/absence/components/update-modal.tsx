import { Modal } from "~/shared/ui/modal";
import { ModalEnum } from "~/features/_core/modal";
import { AbsenceUpdate } from "./update";

export function AbsenceUpdateModal() {
  return (
    <Modal query={ModalEnum.ABSENCE_EDIT} title="Редактирование отсутствия">
      <AbsenceUpdate backOnSuccess />
    </Modal>
  );
}
