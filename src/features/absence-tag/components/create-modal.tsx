import { Modal } from "~/shared/ui/modal";
import { AbsenceTagCreate } from "./create";
import { ModalEnum } from "~/features/_core/modal";

export function AbsenceTagCreateModal() {
  return (
    <Modal
      title="Добавление тега отсутствия"
      description="Тег является общим для группы и будет доступен для всех детей"
      query={ModalEnum.ABSENCE_TAG_CREATE}
    >
      <AbsenceTagCreate />
    </Modal>
  );
}
