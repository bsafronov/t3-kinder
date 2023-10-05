import { Modal } from "~/shared/ui/modal";
import { ModalEnum } from "~/features/_core/modal";
import { NoteUpdate } from "./update";

export function NoteUpdateModal() {
  return (
    <Modal query={ModalEnum.NOTE_EDIT} title="Редактирование примечания">
      <NoteUpdate backOnSuccess />
    </Modal>
  );
}
