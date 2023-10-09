import { ModalEnum } from "~/features/_core/modal";
import { SheetModal } from "~/shared/ui/modal-sheet";

export function CreateEntityModal() {
  return (
    <SheetModal
      title="Создание записи"
      description="Нажмите, чтобы открыть окно создания записи"
      query={ModalEnum.ENTITY_CREATE}
      side="bottom"
    >
      <div className="grid grid-cols-2 gap-4"></div>
    </SheetModal>
  );
}
