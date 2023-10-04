import { Modal } from "~/shared/ui/modal";
import { ModalEnum } from "~/features/_core/modal";
import { ParentCreate } from "./create";

export function ParentCreateModal() {
  return (
    <Modal query={ModalEnum.PARENT_CREATE} title="Добавление родителя">
      <ParentCreate backOnSuccess />
    </Modal>
  );
}
