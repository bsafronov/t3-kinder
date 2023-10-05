import { Modal } from "~/shared/ui/modal";
import { ModalEnum } from "~/features/_core/modal";
import { NoteCreate } from "./create";

export function NoteCreateModal() {
  return (
    <Modal query={ModalEnum.NOTE_CREATE} title="Создание примечания">
      <NoteCreate backOnSuccess />
    </Modal>
  );
}
