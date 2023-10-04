import { Modal } from "~/shared/ui/modal";
import { ModalEnum } from "~/features/_core/modal";
import { ParentEdit } from "./edit";

export function ParentEditModal() {
  return (
    <Modal query={ModalEnum.PARENT_EDIT} title="Редактирование родителя">
      <ParentEdit backOnSuccess />
    </Modal>
  );
}
