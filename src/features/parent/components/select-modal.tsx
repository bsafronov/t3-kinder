import { ModalEnum } from "~/features/_core/modal";
import { Modal } from "~/shared/ui/modal";
import { ParentSelect } from "./select";

export function ParentSelectModal() {
  return (
    <Modal query={ModalEnum.PARENT_SELECT} title="Выбор родителя">
      <ParentSelect backOnSuccess />
    </Modal>
  );
}
