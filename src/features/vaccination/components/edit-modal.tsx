import { ModalEnum } from "~/features/_core/modal";
import { Modal } from "~/shared/ui/modal";
import { VaccinationEdit } from "./edit";

export function VaccinationEditModal() {
  return (
    <Modal query={ModalEnum.VACCINATION_EDIT} title="Редактирование прививки">
      <VaccinationEdit backOnSuccess />
    </Modal>
  );
}
