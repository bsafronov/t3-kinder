import { Modal } from "~/shared/ui/modal";
import { VaccinationTagCreate } from "./create";
import { ModalEnum } from "~/features/_core/modal";

export function VaccinationTagCreateModal() {
  return (
    <Modal
      title="Добавление типа прививки"
      description="Тип является общим для группы и будет доступен для всех детей"
      query={ModalEnum.VACCINATION_TAG_CREATE}
    >
      <VaccinationTagCreate />
    </Modal>
  );
}
