import { Modal } from "~/shared/ui/modal";
import { ModalEnum } from "~/features/_core/modal";
import { AbsenceCreate } from "./create";

export function AbsenceCreateModal() {
  return (
    <Modal query={ModalEnum.ABSENCE_CREATE} title="Создание дня отсутствия">
      <AbsenceCreate backOnSuccess />
    </Modal>
  );
}
