import { Modal } from "~/shared/ui/modal";
import { VaccinationCreate } from "./create";
import { ModalEnum } from "~/features/_core/modal";

export function VaccinationCreateModal() {
  return (
    <Modal query={ModalEnum.VACCINATION_CREATE} title="Добавление прививки">
      <VaccinationCreate backOnSuccess />
    </Modal>
  );
}
