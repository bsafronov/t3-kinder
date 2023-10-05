import { Modal } from "~/shared/ui/modal";
import { NoteTagCreate } from "./create";
import { ModalEnum } from "~/features/_core/modal";

export function NoteTagCreateModal() {
  return (
    <Modal
      title="Добавление тега примечания"
      description="Тег является общим для группы и будет доступен для всех детей"
      query={ModalEnum.NOTE_TAG_CREATE}
    >
      <NoteTagCreate />
    </Modal>
  );
}
