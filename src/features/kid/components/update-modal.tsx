import { Modal } from "~/shared/ui/modal";
import { ModalEnum } from "~/features/_core/modal";
import { KidUpdate } from "./update";

export function KidUpdateModal() {
  return (
    <Modal query={ModalEnum.KID_EDIT} title="Редактирование ребёнка">
      <KidUpdate backOnSuccess />
    </Modal>
  );
}
