import { Modal } from "~/shared/ui/modal";
import { ModalEnum } from "~/features/_core/modal";
import { KidCreate } from "./create";

export function KidCreateModal() {
  return (
    <Modal query={ModalEnum.KID_CREATE} title="Создание ребёнка">
      <KidCreate />
    </Modal>
  );
}
